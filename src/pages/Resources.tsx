import { useParams } from "react-router-dom";
import { useResources } from "@/hooks/useResources";
import { CategoryList } from "@/components/resources/CategoryList";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function ResourcesPage() {
  const { categorySlug } = useParams();
  const { categories, resources, isLoading } = useResources(categorySlug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const selectedCategory = categories?.find(c => c.slug === categorySlug);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Card className="sticky top-8">
            {categories && (
              <CategoryList
                categories={categories}
                selectedSlug={categorySlug}
              />
            )}
          </Card>
        </div>
        <div className="col-span-9">
          <h1 className="text-3xl font-bold mb-6">
            {selectedCategory ? selectedCategory.name : "All Resources"}
          </h1>
          {selectedCategory?.description && (
            <p className="text-muted-foreground mb-6">{selectedCategory.description}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources?.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
            {resources?.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-8">
                No resources found in this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}