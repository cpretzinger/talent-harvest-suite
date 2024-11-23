import { ResourceCategory } from "@/types/resources";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

interface CategoryListProps {
  categories: ResourceCategory[];
  selectedSlug?: string;
}

export const CategoryList = ({ categories, selectedSlug }: CategoryListProps) => {
  const navigate = useNavigate();
  const parentCategories = categories.filter(c => !c.parent_id);

  const getSubcategories = (parentId: string) => {
    return categories.filter(c => c.parent_id === parentId);
  };

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-4 p-4">
        <Button
          variant={!selectedSlug ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => navigate("/resources")}
        >
          All Resources
        </Button>
        {parentCategories.map(category => (
          <div key={category.id} className="space-y-2">
            <Button
              variant={selectedSlug === category.slug ? "secondary" : "ghost"}
              className="w-full justify-start font-semibold"
              onClick={() => navigate(`/resources/category/${category.slug}`)}
            >
              {category.name}
            </Button>
            <div className="ml-4 space-y-1">
              {getSubcategories(category.id).map(subcategory => (
                <Button
                  key={subcategory.id}
                  variant={selectedSlug === subcategory.slug ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    selectedSlug === subcategory.slug && "bg-secondary"
                  )}
                  onClick={() => navigate(`/resources/category/${subcategory.slug}`)}
                >
                  {subcategory.name}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};