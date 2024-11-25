import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

interface InvitationRequest {
  assessmentId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
    
    const { assessmentId, email, firstName, lastName, phone } = await req.json() as InvitationRequest;

    // Create invitation record
    const { data: invitation, error: invitationError } = await supabase
      .from('assessment_invitations')
      .insert({
        assessment_id: assessmentId,
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
      })
      .select()
      .single();

    if (invitationError) throw invitationError;

    // Get assessment details
    const { data: assessment } = await supabase
      .from('assessments')
      .select('title')
      .eq('id', assessmentId)
      .single();

    // Send email via Resend
    const assessmentUrl = `${req.headers.get('origin')}/assessment/${assessmentId}?token=${invitation.unique_token}`;
    
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Assessment Platform <assessment@yourdomain.com>',
        to: [email],
        subject: `You've been invited to take an assessment: ${assessment?.title}`,
        html: `
          <h2>Assessment Invitation</h2>
          <p>You have been invited to take the following assessment: ${assessment?.title}</p>
          <p>Click the link below to start:</p>
          <p><a href="${assessmentUrl}">${assessmentUrl}</a></p>
          <p>This link is unique to you and can be used to resume your assessment if needed.</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
