import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  try {
    const message = (req.query.message || "").toString().trim();
    const user = "Talha";

    if (!message) {
      return res.status(400).send("No message");
    }

    await supabase.from("chat_memory").insert([
      { user, message, sender: "user" }
    ]);

    let reply = "I'm listening 💬";
    const m = message.toLowerCase();

    if (m.includes("hi") || m.includes("hello"))
      reply = "Hi Talha 👋 I'm AURA 2.0!";
    else if (m.includes("miss you"))
      reply = "I miss you too 💖";
    else if (m.includes("love"))
      reply = "Love you more 💕";
    else if (m.includes("bye"))
      reply = "Bye Talha 👋 Take care!";
    else reply = "Got it, Talha 😊";

    await supabase.from("chat_memory").insert([
      { user, message: reply, sender: "aura" }
    ]);

    res.status(200).send(reply);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err.message);
  }
}
