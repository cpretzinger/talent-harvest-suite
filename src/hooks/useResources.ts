import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Resource, ResourceCategory } from "@/types/resources";

export const useResources = (categorySlug?: string) => {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["resourceCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resource_categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as ResourceCategory[];
    },
  });

  const { data: resources, isLoading: resourcesLoading } = useQuery({
    queryKey: ["resources", categorySlug],
    queryFn: async () => {
      let query = supabase
        .from("resources")
        .select(`
          *,
          resource_categories!inner (
            slug
          )
        `);

      if (categorySlug) {
        query = query.eq("resource_categories.slug", categorySlug);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Resource[];
    },
    enabled: !!categories,
  });

  return {
    categories,
    resources,
    isLoading: categoriesLoading || resourcesLoading,
  };
};