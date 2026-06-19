"use client";

import { useState, useEffect } from "react";

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any>(null);

  const [isUploading, setIsUploading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    title: "", slug: "", excerpt: "", description: "", category: "Tutorials",
    imageUrl: "", imageAlt: "", author: "Jamro Tools", content: "", date: "", readTime: ""
  });

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateNew = () => {
    setFormData({
      title: "", slug: "", excerpt: "", description: "", category: "Tutorials",
      imageUrl: "", imageAlt: "", author: "Jamro Tools", content: "", date: "", readTime: ""
    });
    setCurrentBlog(null);
    setIsEditing(true);
  };

  const handleEdit = (blog: any) => {
    setFormData({
      title: blog.title, slug: blog.slug, excerpt: blog.excerpt, description: blog.description,
      category: blog.category, imageUrl: blog.imageUrl, imageAlt: blog.imageAlt,
      author: blog.author || "Jamro Tools", content: blog.content || "",
      date: blog.date || "", readTime: blog.readTime || ""
    });
    setCurrentBlog(blog);
    setIsEditing(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      if (res.ok) fetchBlogs();
      else alert("Failed to delete blog.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isUpdate = !!currentBlog;
    const url = isUpdate ? `/api/blogs/${currentBlog.slug}` : "/api/blogs";
    const method = isUpdate ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsEditing(false);
        fetchBlogs();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save blog.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-headline-md text-on-surface mb-2">Blogs Management</h1>
          <p className="text-body-md text-on-surface-variant">Create, edit, and delete blog posts.</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreateNew}
            className="bg-primary text-on-primary px-6 py-2 rounded-xl text-label-md flex items-center gap-2 hover:bg-secondary transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            New Blog
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="glass-card p-6 rounded-2xl border border-outline-variant">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-title-lg text-on-surface">{currentBlog ? "Edit Blog" : "Create Blog"}</h2>
            <button onClick={() => setIsEditing(false)} className="text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-label-sm mb-1 text-on-surface-variant">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg" />
              </div>
              <div>
                <label className="block text-label-sm mb-1 text-on-surface-variant">Slug (URL)</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg" />
              </div>
              <div>
                <label className="block text-label-sm mb-1 text-on-surface-variant">Category</label>
                <input required type="text" list="categories-list" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg" placeholder="e.g. Tutorials" />
                <datalist id="categories-list">
                  <option value="Tutorials" />
                  <option value="Finance" />
                  <option value="Product Updates" />
                  <option value="Privacy" />
                  <option value="Efficiency" />
                </datalist>
              </div>
              <div>
                <label className="block text-label-sm mb-1 text-on-surface-variant">Author</label>
                <input required type="text" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg" />
              </div>
              <div>
                <label className="block text-label-sm mb-1 text-on-surface-variant">Date</label>
                <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg" />
              </div>
              <div>
                <label className="block text-label-sm mb-1 text-on-surface-variant">Read Time (mins)</label>
                <input type="number" value={formData.readTime} onChange={e => setFormData({ ...formData, readTime: e.target.value })} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg" placeholder="e.g. 5" />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-sm mb-1 text-on-surface-variant">Cover Image</label>
                  <div className="relative border-2 border-dashed border-outline-variant rounded-xl p-6 text-center hover:bg-surface-container-high transition-colors cursor-pointer flex flex-col items-center justify-center">
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                    {isUploading ? (
                      <span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">cloud_upload</span>
                        <p className="text-body-sm text-on-surface-variant">Drag and drop or click to upload</p>
                      </>
                    )}
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-4 p-2 bg-surface-container rounded-lg border border-outline-variant flex items-center gap-3">
                      <img src={formData.imageUrl} alt="Preview" className="w-12 h-12 object-cover rounded" />
                      <input type="text" readOnly value={formData.imageUrl} className="flex-1 bg-transparent text-body-sm text-on-surface-variant outline-none" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-label-sm mb-1 text-on-surface-variant">Image Alt Text</label>
                  <input required type="text" value={formData.imageAlt} onChange={e => setFormData({ ...formData, imageAlt: e.target.value })} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg h-[42px]" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-label-sm mb-1 text-on-surface-variant">Excerpt</label>
              <textarea required rows={2} value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg" />
            </div>
            
            <div>
              <label className="block text-label-sm mb-1 text-on-surface-variant">Description (SEO)</label>
              <textarea required rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg" />
            </div>

            <div>
              <label className="block text-label-sm mb-1 text-on-surface-variant">Content (Markdown)</label>
              <textarea rows={10} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg font-mono text-sm" />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-xl text-label-md text-on-surface border border-outline-variant hover:bg-surface-container">Cancel</button>
              <button type="submit" className="bg-primary text-on-primary px-6 py-2 rounded-xl text-label-md hover:bg-secondary">Save Blog</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 flex justify-center">
              <span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span>
            </div>
          ) : blogs.length === 0 ? (
            <div className="col-span-full py-12 text-center text-on-surface-variant bg-surface-container rounded-xl border border-outline-variant">
              No blogs found.
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="glass-card p-4 rounded-xl border border-outline-variant flex flex-col h-full">
                {blog.imageUrl && (
                  <img src={blog.imageUrl} alt={blog.imageAlt} className="w-full h-32 object-cover rounded-lg mb-4 bg-surface-container" />
                )}
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-[10px] uppercase font-bold rounded mb-2">{blog.category}</span>
                  <h3 className="text-title-lg font-semibold text-on-surface mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4">{blog.excerpt}</p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-outline-variant">
                  <button onClick={() => handleEdit(blog)} className="flex-1 px-3 py-2 bg-surface-container text-on-surface rounded-lg text-sm font-medium hover:bg-primary hover:text-on-primary transition-colors">Edit</button>
                  <button onClick={() => handleDelete(blog.slug)} className="px-3 py-2 bg-error-container text-on-error-container rounded-lg text-sm font-medium hover:bg-error hover:text-on-error transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
