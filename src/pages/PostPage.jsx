import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/PostPage.module.css";
import { Icon } from "@iconify/react";

export default function PostPage({ type }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    condition: "",
    size: "",
    sex: "",
    price: "",
    isFree: type === "give",
    description: "",
    materials: "",
    color: "",
    isPublic: false,
    locationDetails: "",
    imageFiles: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData({
      ...formData,
      [name]: inputType === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, imageFiles: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not logged in");

      // 🔹 Upload images
      let imageUrls = [];
      if (formData.imageFiles.length > 0) {
        for (const file of formData.imageFiles) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}.${fileExt}`;
          const { data: uploadData, error: uploadError } =
            await supabase.storage.from("post-images").upload(fileName, file);
          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage
            .from("post-images")
            .getPublicUrl(uploadData.path);

          if (publicUrlData?.publicUrl) imageUrls.push(publicUrlData.publicUrl);
        }
      }

      // 🔹 Insert into Supabase
      const { error } = await supabase.from("posts").insert([
        {
          user_id: user.id,
          title: formData.title,
          brand: formData.brand,
          category: formData.category,
          condition: formData.condition,
          size: formData.size,
          sex: formData.sex,
          price: type === "give" ? 0 : Number(formData.price),
          is_free: type === "give" ? true : formData.isFree,
          description: formData.description,
          materials: formData.materials,
          color: formData.color,
          is_public: formData.isPublic,
          location_details: formData.locationDetails,
          image_urls: imageUrls,
          image_url: imageUrls[0] || null,
          post_type: type,
        },
      ]);

      if (error) throw error;

      // ✅ Navigate to success page with item info
      navigate(`/post/success/${type}`, {
        state: {
          title: formData.title,
          image: imageUrls[0] || "",
        },
      });
    } catch (err) {
      console.error("❌ Error creating post:", err.message);
      setMessage("Failed to post item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        {type === "give" ? "Give an item" : "Post an item"}
      </h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 🔹 Multiple image upload */}
        <div className={styles.imageUpload}>
          <Icon icon="proicons:image" className={styles.uploadIcon} />
          <p className={styles.uploadText}>Tap to upload photos (max 5)</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div>

        {formData.imageFiles.length > 0 && (
          <div className={styles.previewContainer}>
            {formData.imageFiles.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt={`preview-${i}`}
                className={styles.previewImage}
              />
            ))}
          </div>
        )}

        {/* 🔹 Product Info */}
        <label className={styles.label}>Product</label>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          name="brand"
          type="text"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className={styles.input}
        />

        {/* 🔹 Price only visible for "sell" */}
        {type === "sell" && (
          <>
            <label className={styles.label}>
              Please enter a price for your item:
            </label>
            <div className={styles.priceRow}>
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className={styles.priceInput}
              />
              <span className={styles.currency}>DKK</span>
            </div>
          </>
        )}

        {/* 🔹 Category */}
        <label className={styles.label}>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.input}>
          <option value="">Select</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Accessories">Accessories</option>
          <option value="Electronics">Electronics</option>
          <option value="Home">Home</option>
        </select>

        {/* 🔹 Clothing details */}
        {formData.category === "Clothing" && (
          <>
            <input
              name="size"
              type="text"
              placeholder="Size"
              value={formData.size}
              onChange={handleChange}
              className={styles.input}
            />
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className={styles.input}>
              <option value="">Sex</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
              <option value="Kids">Kids</option>
            </select>
          </>
        )}

        {/* 🔹 Description */}
        <label className={styles.label}>Description</label>
        <textarea
          name="description"
          placeholder="Describe your product"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
        />

        {/* 🔹 More details */}
        <label className={styles.label}>More details</label>
        <input
          name="materials"
          type="text"
          placeholder="Materials"
          value={formData.materials}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          name="color"
          type="text"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          className={styles.input}
        />

        {/* 🔹 Visibility */}
        <div className={styles.switchRow}>
          <label className={styles.label}>Is the item placed in public?</label>
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className={styles.checkbox}
          />
        </div>

        <textarea
          name="locationDetails"
          placeholder="Any details about the pickup location..."
          value={formData.locationDetails}
          onChange={handleChange}
          className={styles.textarea}
        />

        <button
          type="submit"
          className={styles.uploadButton}
          disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
