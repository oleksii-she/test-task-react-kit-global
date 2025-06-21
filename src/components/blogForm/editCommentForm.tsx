export const CommentEdit = ({
  value,
  onChangeHandler,
  submit,
  type,
  defaultFields,
}: {
  value: string | undefined;
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  submit: () => Promise<void>;
  type: "text" | "author";
  defaultFields: () => void;
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

          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-tr from-emerald-500 to-emerald-600 text-white font-semibold text-sm rounded-full shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 active:scale-95"
            >
              ✅ Confirm
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 px-2 py-2 bg-gray-200 text-gray-800 font-semibold text-sm rounded-full shadow-inner hover:bg-gray-300 transition-all duration-200 active:scale-95"
              onClick={defaultFields}
            >
              ❌ Close
            </button>
          </div>
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

        <div className="flex items-center justify-start sm:justify-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-tr from-emerald-500 to-emerald-600 text-white font-semibold text-sm rounded-full shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 active:scale-95"
          >
            ✅ Confirm
          </button>
          <button
            type="button"
            onClick={defaultFields}
            className="inline-flex items-center gap-1 px-4 py-2 bg-gray-300 text-gray-800 font-semibold text-sm rounded-full shadow-inner hover:bg-gray-400 transition-all duration-200 active:scale-95"
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
};
