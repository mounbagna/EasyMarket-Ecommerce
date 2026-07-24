"use client";

import { useState } from "react";
import { Send, MessageSquare } from "lucide-react";

export default function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );
      const data = await response.json();
      setMessage("")

    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="py-12">
    <div className="pt-20 sm:pt-20 lg:pt-20 xl:pt-10 bg-[#E5EAF4] max-w-xl mx-auto p-6 rounded-lg shadow">
      <div className="flex items-center gap-3 mb-5">
        <MessageSquare size={30} className="test-green"/>
      <h2 className="text-2xl font-semibold mb-4">
        Send us your feedback
      </h2>
</div>
      <form onSubmit={handleSubmit} className="space-y-4">

        <textarea
          className="w-full border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
        type="submit"
          disabled={loading}
          className="mt-4 bg-blue-600 text-black px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          <Send size={18}/>Send </button>
          </form>

        {status && (
          <p className="text-red-500 mt-2">
            {status}
          </p>
        )}
    </div>
    </section>
  );
}