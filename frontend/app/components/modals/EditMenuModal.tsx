import React, { useState } from 'react';

interface EditMenuModalProps {
  item: any; // Replace with MenuItem type
  onClose: () => void;
}

const EditMenuModal = ({ item, onClose }: EditMenuModalProps) => {
  // Local state to manage form inputs
  const [formData, setFormData] = useState({
    Name: item.Name,
    Price: item.Price,
    RecipeCategory: item.RecipeCategory,
    RecipeIngredientParts: item.RecipeIngredientParts,
    Calories: item.Calories || 0,
    FatContent: item.FatContent || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving data to DB:", formData);
    // Add your fetch/action call here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900">Edit Dish Details</h2>
            <p className="text-xs text-slate-500 font-medium">Update ID: {item.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-8 space-y-6">
          
          {/* Main Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Dish Name</label>
              <input 
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Price ($)</label>
              <input 
                name="Price"
                type="number"
                step="0.01"
                value={formData.Price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-none" 
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
            <select 
              name="RecipeCategory"
              value={formData.RecipeCategory}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-none"
            >
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
              <option value="Appetizer">Appetizer</option>
            </select>
          </div>

          {/* Ingredients Textarea */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Ingredients (Separated by commas)</label>
            <textarea 
              name="RecipeIngredientParts"
              rows={3}
              value={formData.RecipeIngredientParts}
              onChange={handleChange}
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-none resize-none" 
            />
          </div>

          {/* Nutrition Mini-Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100">
               <label className="text-[10px] font-black uppercase text-violet-400 block mb-1">Calories</label>
               <input 
                name="Calories"
                type="number"
                value={formData.Calories}
                onChange={handleChange}
                className="bg-transparent text-sm font-black text-violet-900 outline-none w-full" 
               />
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
               <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Fat (g)</label>
               <input 
                name="FatContent"
                type="number"
                value={formData.FatContent}
                onChange={handleChange}
                className="bg-transparent text-sm font-black text-slate-900 outline-none w-full" 
               />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 text-sm font-black text-slate-500 hover:bg-slate-100 rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-4 bg-violet-600 text-white text-sm font-black rounded-2xl shadow-xl shadow-violet-200 hover:bg-violet-700 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuModal;