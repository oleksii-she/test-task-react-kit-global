import { SectionBlogs } from "@/components/sectionBlog/sectionBlog";

import { getBlogsRoute } from "@/routes/getBlogsRoute";
export const dynamic = "force-dynamic";
const Home = async () => {
  const blogs = await getBlogsRoute();

  return <SectionBlogs blogs={blogs} />;
};

export default Home;
