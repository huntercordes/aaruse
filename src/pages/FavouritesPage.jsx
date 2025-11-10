import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Icon } from "@iconify/react";
import styles from "../styles/FavouritesPage.module.css";

export default function FavouritesPage() {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("favourites")
      .select("post_id, posts(*)")
      .eq("user_id", user.id);

    if (error) console.error("❌ Error loading favourites:", error.message);
    else setFavourites(data);
    setLoading(false);
  };

  const handleRemoveFavourite = async (postId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("favourites")
      .delete()
      .eq("user_id", user.id)
      .eq("post_id", postId);

    setFavourites(favourites.filter((item) => item.post_id !== postId));
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Icon
          icon="ph:arrow-left-light"
          className={styles.backIcon}
          onClick={() => navigate(-1)}
        />
        <h2 className={styles.title}>Favourites</h2>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : favourites.length === 0 ? (
        <p className={styles.empty}>You have no favourites yet.</p>
      ) : (
        <div className={styles.list}>
          {favourites.map(({ posts }) => (
            <div
              key={posts.id}
              className={styles.card}
              onClick={() => navigate(`/post/${posts.id}`)}>
              <img
                src={
                  (Array.isArray(posts.image_urls) && posts.image_urls[0]) ||
                  posts.image_url
                }
                alt={posts.title}
                className={styles.cardImage}
              />
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{posts.title}</h3>
                <p className={styles.cardPrice}>
                  {posts.is_free ? "Free" : `${posts.price} DKK`}
                </p>
              </div>
              <Icon
                icon="ph:heart-fill"
                className={`${styles.heartIcon}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavourite(posts.id);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
