import { useState } from "react";
import NutritionModal from "~/components/modals/NutritionModal";
import type { MenuItem } from "~/utils/types";
import { menuService } from "~/api/menu.service";
import { useLoaderData } from "react-router";

export async function loader({ request }: { request: Request }) {
    return await menuService.getMenu(request);
}


export default function RestaurantMenu() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const items : MenuItem[] = useLoaderData()

  // Grouping logic remains for the categorical layout
  const categories = items.reduce((acc, item) => {
    if (!acc[item.RecipeCategory]) acc[item.RecipeCategory] = [];
    acc[item.RecipeCategory].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="space-y-12">
        <header className="border-b border-slate-100 pb-8">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Culinary Selection
            </h1>
            <p className="text-slate-500 mt-2 text-lg font-medium">
            Explore our seasonal dishes, locally sourced ingredients, and nutritional details.
            </p>
        </header>
        
        {Object.entries(categories).map(([category, categoryItems]) => (
            <section key={category}>
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                {category}
                </h2>
                <div className="h-px bg-slate-200 flex-1" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {categoryItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all text-left group"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-[oklch(49.1%_0.27_292.581)] transition-colors">
                            {item.Name}
                        </h3>
                        <span className="text-sm font-black text-slate-900 px-3 py-1 bg-slate-50 rounded-xl">
                            ${item.Price}
                        </span>
                    </div>
                    
                    <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2 mb-6">
                    {item.RecipeIngredientParts}
                    </p>

                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                    Details & Nutrition
                    <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    </div>
                </button>
                ))}
            </div>
            </section>
        ))}

        {/* Modal Integration */}
        {selectedItem && (
            <NutritionModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
    </div>
  );
}