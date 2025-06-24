import Link from "next/link";
import { getBlogByIdRoute } from "@/routes/getBlogsRoute";
import { EditBlogBtn } from "@/components/ButtonEditBlog";
import { DeleteBlogBtn } from "@/components/ButtonDeleteBlog";
import { SectionComments } from "@/components/sectionComments";
import { getCommentsForPost } from "@/routes/commentsRoutes";
import NotFound from "../not-found";
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
  console.log(res, "res");

  if (!res) {
    return NotFound();
  }

  return (
    <>
      <section className="text-gray-100 pb-24">
        <article className="space-y-6">
          <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 px-4 sm:px-6 py-6 sm:py-8 rounded-xl shadow-md border border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-400 mb-4 tracking-tight leading-tight">
              {res?.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {res?.description}
            </p>
          </div>

          <div className="">
            <Link
              href="/"
              className="text-amber-500 hover:underline text-sm font-medium"
            >
              ← Go back
            </Link>

            <div className="sm:w-full flex justify-between mt-5">
              <EditBlogBtn id={id} data={res} />
              <DeleteBlogBtn id={id} />
            </div>
          </div>
        </article>
      </section>
      <SectionComments data={comments} id={id} />
    </>
  );
};

export default PageId;
