import Link from "next/link";
import { getBlogByIdRoute } from "@/routes/getBlogsRoute";
import { EditBlogBtn } from "@/components/ButtonEditBlog";
import { DeleteBlogBtn } from "@/components/ButtonDeleteBlog";
import { SectionComments } from "@/components/sectionComments";
import { getCommentsForPost } from "@/routes/commentsRoutes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const res = await getBlogByIdRoute(id);

  if (!res) return;

  return {
    title: res.title,
    description: res.description,
  };
}

const PageId = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const res = await getBlogByIdRoute(id);
  const comments = await getCommentsForPost(id);

  return (
    <>
      <section className=" text-gray-100 px-6 pb-24">
        <div className="mx-auto space-y-6">
          <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 p-8 rounded-xl shadow-md border border-gray-700">
            <h2 className="text-3xl font-bold text-indigo-400 mb-4 tracking-tight leading-tight">
              {res?.title}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
              {res?.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
            <Link
              href="/"
              className="text-amber-500 hover:underline text-sm font-medium"
            >
              ← Go back
            </Link>

            <div className="flex gap-4">
              <EditBlogBtn id={id} data={res} />
              <DeleteBlogBtn id={id} />
            </div>
          </div>
        </div>
      </section>
      <SectionComments data={comments} id={id} />
    </>
  );
};

export default PageId;
