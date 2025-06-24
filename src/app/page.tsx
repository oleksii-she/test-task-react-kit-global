import SectionBlogsWrapper from "@/components/sectionBlog/SectionBlogsWrapper";
import { getBlogsRoute } from "@/routes/getBlogsRoute";
export const dynamic = "force-dynamic";
const Home = async () => {
  const blogs = await getBlogsRoute();

  return <SectionBlogsWrapper blogs={blogs} />;
};

export default Home;
