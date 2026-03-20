import { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import type { MenuItem } from "~/utils/types";
import { menuService } from "~/api/menu.service";
import EditMenuModal from "~/components/modals/EditMenuModal"; 

export async function loader({ request }: { request: Request }) {
  return await menuService.getMenu(request);
}

export default function StaffMenuManager() {
  const items: MenuItem[] = useLoaderData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // States for filtering and searching
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // 1. Get unique categories for the filter chips
  const categoryList = useMemo(() => {
    const cats = Array.from(new Set(items.map(item => item.RecipeCategory)));
    return ["All", ...cats];
  }, [items]);

  // 2. Filter logic: Search name/ingredients + Category filter
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.Name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.RecipeIngredientParts?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.RecipeCategory === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, activeCategory]);

  // 3. Grouping logic for the filtered results
  const categories = filteredItems.reduce((acc, item) => {
    if (!acc[item.RecipeCategory]) acc[item.RecipeCategory] = [];
    acc[item.RecipeCategory].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="space-y-8">
      {/* Header & Search Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Menu Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Add new dishes or update existing ones.</p>
        </div>

        <div className="relative w-full md:w-80">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text"
            placeholder="Search dish or ingredient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all"
          />
        </div>

        <button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-violet-600 text-white text-sm font-black rounded-2xl shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all active:scale-95"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Item
        </button>
      </header>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categoryList.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat 
              ? "bg-violet-600 text-white shadow-lg shadow-violet-200" 
              : "bg-white text-slate-500 border border-slate-200 hover:border-violet-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="space-y-12">
        {Object.entries(categories).length > 0 ? (
          Object.entries(categories).map(([category, categoryItems]) => (
            <section key={category}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{category}</h2>
                <div className="h-px bg-slate-100 flex-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="max-w-[70%]">
                        <h3 className="text-lg font-black text-slate-900 leading-tight">{item.Name}</h3>
                        <p className="text-[10px] font-bold text-violet-500 uppercase mt-1 tracking-tighter">{item.RecipeCategory}</p>
                      </div>
                      <span className="text-sm font-black text-slate-900 px-3 py-1 bg-slate-50 border border-slate-100 rounded-xl">
                        ${item.Price}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6 line-clamp-2">
                      {item.RecipeIngredientParts}
                    </p>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-full py-3 bg-slate-50 group-hover:bg-violet-600 group-hover:text-white text-slate-600 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      Edit Dish
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">No dishes found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Edit Modal Integration */}
      {selectedItem && (
        <EditMenuModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <EditMenuModal 
          item={{ Name: "", Price: 0, RecipeCategory: "Main Course", RecipeIngredientParts: "" }} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}
    </div>
  );
}