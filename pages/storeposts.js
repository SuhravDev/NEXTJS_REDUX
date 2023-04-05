import Link from "next/link";
import { useSelector } from "react-redux";
import { addPosts, addTitle } from "../store/postsSlice";
import { wrapper } from "../store/store";

const Storeposts = (props) => {
  const { posts, title } = useSelector((state) => state.posts);

  return (
    <div>
      <h1>{title}</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}

      <Link href="/">
        <a>Navigate</a>
      </Link>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      if (query?.store === "false" || !query || !query?.store) {
        console.log("fetching from backend");
        const response = await (
          await fetch(`https://jsonplaceholder.typicode.com/posts`)
        ).json();
        store.dispatch(addPosts(response));
        store.dispatch(addTitle("POST FROM BACKEND"));
      } else {
        console.log("AVAILABLE IN STORE");
        store.dispatch(addTitle("POST FROM STORE"));
      }
    }
);

export default Storeposts;
