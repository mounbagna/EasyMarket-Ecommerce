import { sendFeedbackEmail } from "../utils/sendFeedbackEmail.js";

export const sendFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    // Check if message exists
    if (!message || message.trim() === "") {
      return res.status(400).json({
        message: "Feedback message is required"
      });
    }

    // Send feedback to admin email
    await sendFeedbackEmail(message);

    res.status(200).json({
      message: "Feedback sent successfully"
    });

  } catch (error) {
    console.error("Feedback error:", error);

    return res.status(500).json({
      message: "Failed to send feedback"
    });
  }
};
