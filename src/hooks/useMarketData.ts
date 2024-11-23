import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMarketData = (marketIds: string[]) => {
  return useQuery({
    queryKey: ["marketData", marketIds],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("market_data")
        .select("*")
        .in("id", marketIds);

      if (error) throw error;
      return data;
    },
    enabled: marketIds.length > 0,
  });
};