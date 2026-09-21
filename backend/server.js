const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "HairBuddy backend is running successfully! 💜",
  });
});

// Free HairBuddy response system
app.post("/api/chat", (req, res) => {
  const {
    message = "",
    hairType = "Unknown",
    scalpType = "Unknown",
    concern = "General hair care",
  } = req.body;

  const text = message.toLowerCase();

  let reply = "";

  // Greeting
  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {
    reply = `Hi! 👋 I'm HairBuddy.

I know that you have ${hairType.toLowerCase()} hair, a ${scalpType.toLowerCase()} scalp, and your main concern is ${concern.toLowerCase()}.

Ask me anything about your hair-care routine! 💜`;
  }

  // Hair fall
  else if (
    text.includes("hair fall") ||
    text.includes("hair loss") ||
    text.includes("falling hair")
  ) {
    reply = `Since your hair type is ${hairType} and your scalp type is ${scalpType}, here are some simple steps for hair fall:

🌿 1. Be gentle while combing and avoid pulling wet hair.
🧴 2. Use a mild shampoo and avoid very hot water.
💆‍♀️ 3. Gently massage your scalp for a few minutes.
🥗 4. Maintain a balanced diet with enough protein, iron and other nutrients.
😴 5. Get enough sleep and try to manage stress.

If hair loss is sudden, severe, or persistent, consider consulting a dermatologist.`;
  }

  // Dandruff
  else if (
    text.includes("dandruff") ||
    text.includes("flakes") ||
    text.includes("flaky")
  ) {
    reply = `For your ${scalpType.toLowerCase()} scalp and dandruff concern, try this routine:

🧴 Use an anti-dandruff shampoo according to its instructions.
🚿 Wash your scalp regularly and rinse shampoo thoroughly.
❌ Avoid scratching your scalp.
🌿 Avoid applying heavy oils directly to a dandruff-prone scalp if they make the problem worse.
💧 Keep your hair lengths moisturized, especially because your hair is ${hairType.toLowerCase()}.

If dandruff is severe, painful, or doesn't improve, a dermatologist can help identify the cause.`;
  }

  // Dry hair
  else if (
    text.includes("dry") ||
    text.includes("dryness")
  ) {
    reply = `Because you have ${hairType.toLowerCase()} hair, dryness can make your hair feel rough and increase frizz.

Try this routine:

💧 1. Use a moisturizing shampoo and conditioner.
🧴 2. Apply conditioner mainly to your mid-lengths and ends.
✨ 3. Use a small amount of leave-in conditioner after washing.
🚿 4. Avoid very hot water.
🔥 5. Reduce frequent heat styling.
🪮 6. Detangle gently from the ends upward.

Since your scalp is ${scalpType.toLowerCase()}, avoid putting heavy moisturizing products directly on your scalp unless they are suitable for it.`;
  }

  // Frizz
  else if (
    text.includes("frizz") ||
    text.includes("frizzy")
  ) {
    reply = `For your ${hairType.toLowerCase()} hair, try these anti-frizz habits:

✨ Use conditioner after every shampoo.
💧 Apply a lightweight leave-in conditioner to damp hair.
🪮 Use a wide-tooth comb instead of brushing aggressively.
🧻 Avoid rough towel drying; gently squeeze excess water.
🔥 Limit excessive heat styling.
🌙 Protect your hair while sleeping with a smooth pillowcase or gentle hair protection.

The key is keeping the hair lengths moisturized without making your ${scalpType.toLowerCase()} scalp unnecessarily oily.`;
  }

  // Hair growth
  else if (
    text.includes("growth") ||
    text.includes("grow my hair") ||
    text.includes("long hair")
  ) {
    reply = `For healthy hair growth, focus on keeping your scalp and hair lengths healthy:

🥗 Eat a balanced diet with adequate protein and nutrients.
💆‍♀️ Massage your scalp gently.
🧴 Keep your scalp clean.
✂️ Minimize unnecessary chemical and heat damage.
💧 Keep your ${hairType.toLowerCase()} hair moisturized.
😴 Maintain good sleep and stress-management habits.

Hair grows gradually, so consistency is more useful than expecting overnight results.`;
  }

  // Damaged hair
  else if (
    text.includes("damage") ||
    text.includes("damaged") ||
    text.includes("split ends")
  ) {
    reply = `For damaged ${hairType.toLowerCase()} hair:

🧴 Use a nourishing conditioner regularly.
💧 Consider a hair mask once a week.
🔥 Reduce straightening, curling and high-heat drying.
🎨 Avoid frequent harsh chemical treatments.
🪮 Handle wet hair gently.
✂️ Regular trims can help manage split ends.

Focus on preventing additional damage while keeping your hair moisturized.`;
  }

  // Routine
  else if (
    text.includes("routine") ||
    text.includes("daily") ||
    text.includes("what should i do")
  ) {
    reply = `Here is a simple personalized routine for your ${hairType.toLowerCase()} hair and ${scalpType.toLowerCase()} scalp:

🌞 MORNING
• Gently detangle your hair.
• Use a lightweight leave-in product if your lengths feel dry.
• Avoid unnecessary heat styling.

🚿 WASH DAY
• Clean your scalp with a suitable shampoo.
• Apply conditioner to your lengths.
• Rinse thoroughly.
• Gently dry your hair without rough rubbing.

🌙 NIGHT
• Gently detangle before sleeping.
• Keep your hair loosely tied if needed.
• Avoid sleeping with soaking-wet hair.

Your main focus should be: ${concern.toLowerCase()}. 💜`;
  }

  // Products
  else if (
    text.includes("product") ||
    text.includes("shampoo") ||
    text.includes("conditioner")
  ) {
    reply = `For your ${hairType.toLowerCase()} hair and ${scalpType.toLowerCase()} scalp, look for:

🧴 A gentle shampoo suitable for your scalp type.
💧 A moisturizing conditioner for your hair lengths.
✨ A lightweight leave-in conditioner if you experience dryness or frizz.

Since your main concern is ${concern.toLowerCase()}, choose products based on that concern as well.

If you have dandruff or persistent scalp irritation, consider getting professional advice rather than relying only on cosmetic products.`;
  }

  // Default intelligent response
  else {
    reply = `Thanks for your question! 💜

Based on your profile:

💇 Hair type: ${hairType}
🌿 Scalp type: ${scalpType}
🎯 Main concern: ${concern}

For your hair, focus on gentle cleansing, regular conditioning, minimizing excessive heat, and handling your hair gently.

You can ask me things like:

• "Give me a hair-care routine"
• "How can I reduce frizz?"
• "What should I do for dandruff?"
• "How can I reduce hair fall?"
• "Suggest shampoo and conditioner"
• "How can I improve hair growth?"

I'm here to help! ✨`;
  }

  res.json({
    reply,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`HairBuddy backend running on http://localhost:${PORT}`);
});