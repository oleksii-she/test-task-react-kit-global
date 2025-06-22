export const CommentEdit = ({
  value,
  onChangeHandler,
  type,
}: {
  value: string | undefined;
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type: "text" | "author";
}) => {
  if (type === "text") {
    return (
      <div>
        <div className="flex items-center flex-col  gap-1">
          <textarea
            name="text"
            value={value}
            onChange={onChangeHandler}
            className="w-full border-gray-700  bg-neutral-800 text-white border  md:min-h-[200px]   px-5 py-3 h-36 rounded-lg shadow-inner resize-none   focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500   placeholder-gray-500 transition duration-300"
          ></textarea>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <input
          className="w-full border-gray-700  bg-neutral-800 text-white border px-5 py-3  rounded-lg shadow-inner resize-none   focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500   placeholder-gray-500 transition duration-300"
          type="text"
          name="author"
          placeholder="Enter your name"
          value={value}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};
