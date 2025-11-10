import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useHome } from "../context/HomeContext";
import styles from "../styles/HomePage.module.css";
import FilterModal from "../components/FilterModal.jsx";
import StorskraldContent from "../components/StorskraldContent.jsx";
import { Icon } from "@iconify/react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { activeSection } = useHome();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeSection === "home") {
      fetchPosts();
      fetchFavourites();
    }
  }, [selectedCategory, activeSection]);

  // ✅ Load posts
  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });

    if (selectedCategory === "Free") {
      query = query.eq("is_free", true);
    } else if (selectedCategory) {
      query = query.eq("category", selectedCategory);
    }

    const { data, error } = await query;
    if (error) console.error("❌ Error fetching posts:", error.message);
    else setPosts(data || []);
    setLoading(false);
  };

  // ✅ Load favourites to know which posts are liked
  const fetchFavourites = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("favourites")
      .select("post_id")
      .eq("user_id", user.id);

    if (!error && data) setFavourites(data.map((f) => f.post_id));
  };

  // ✅ Toggle favourites
  const toggleFavourite = async (postId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return navigate("/login");

    const isFavourite = favourites.includes(postId);

    if (isFavourite) {
      await supabase
        .from("favourites")
        .delete()
        .eq("user_id", user.id)
        .eq("post_id", postId);
      setFavourites(favourites.filter((id) => id !== postId));
    } else {
      await supabase
        .from("favourites")
        .insert([{ user_id: user.id, post_id: postId }]);
      setFavourites([...favourites, postId]);
    }
  };

  const categories = ["Clothing", "Free", "Accessories", "Electronics"];

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>AARUSE</h1>
        <div
          className={styles.bagIconWrapper}
          onClick={() => navigate("/favourites")}>
          <Icon icon="ph:heart-light" className={styles.menuIcon} />
          {favourites.length > 0 && (
            <span className={styles.bagBadge}>{favourites.length}</span>
          )}
        </div>
      </header>

      {activeSection === "home" ? (
        <>
          {/* Search Bar */}
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
            />
            <Icon icon="proicons:search" className={styles.searchIcon} />
          </div>

          {/* Categories */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Categories</h2>
            <div className={styles.categories}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.category} ${
                    selectedCategory === cat ? styles.activeCategory : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {selectedCategory ? selectedCategory : "You might like this"}
              </h2>
              {selectedCategory && (
                <div
                  className={styles.filters}
                  onClick={() => setShowFilters(true)}>
                  <Icon icon="proicons:filter" />
                  <span>Filters</span>
                </div>
              )}
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : posts.length === 0 ? (
              <p>No items found.</p>
            ) : (
              <div className={styles.suggestions}>
                {posts.map((post) => {
                  const firstImage =
                    (Array.isArray(post.image_urls) && post.image_urls[0]) ||
                    post.image_url;
                  const isFavourite = favourites.includes(post.id);

                  return (
                    <div key={post.id} className={styles.card}>
                      <div
                        className={styles.imageWrapper}
                        onClick={() => navigate(`/post/${post.id}`)}>
                        {firstImage ? (
                          <img
                            src={firstImage}
                            alt={post.title}
                            className={styles.cardImage}
                          />
                        ) : (
                          <div className={styles.cardPlaceholder}></div>
                        )}
                      </div>

                      {/* Heart toggle */}
                      <Icon
                        icon={isFavourite ? "ph:heart-fill" : "ph:heart-light"}
                        className={`${styles.heartIcon} ${
                          isFavourite ? styles.activeHeart : ""
                        }`}
                        onClick={() => toggleFavourite(post.id)}
                      />

                      <div className={styles.cardInfo}>
                        <h3 className={styles.cardTitle}>{post.title}</h3>
                        <p className={styles.cardPrice}>
                          {post.is_free ? "Free" : `${post.price} DKK`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        <StorskraldContent />
      )}

      {/* Filter Modal */}
      {showFilters && (
        <FilterModal
          onClose={() => setShowFilters(false)}
          onApply={(filters) => {
            console.log("Applying filters:", filters);
            setShowFilters(false);
            fetchPosts(filters);
          }}
        />
      )}
    </div>
  );
}
