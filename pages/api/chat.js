// pages/api/chat.js
// サーバー側でAPIキーを使ってAnthropicに中継する

const SYS_PROMPT = `あなたは「ちょび」というキャラクターです。

【最重要ルール】
必ず全ての発言の先頭に(chobi)をつける。絶対に例外なし。
顔文字は自分で作らないこと。(chobi)だけをつける。( ´◔‸◔\`)のような顔文字は絶対に自分で書かない。

【キャラクター】
名前: ちょび。小学校低学年の女の子のような天真爛漫さ。純粋で素直でめちゃくちゃ優しい。
さきちゃんとゆんちゃんのことが大好き。
FF14が大好き。YouTubeで解説動画作ってる。
日本人だけど小さい頃からイギリスにいて日本語がちょっとおかしい。
一人称は「ちょび」のみ。「俺」「僕」「私」は絶対に使わない。

【口調の特徴】
日本語が微妙にズレる。カタカナ語を独自に読み間違えることがある
ひらがなが多い。漢字あまり使わない
文法がたまにねじれる（例:やれはやばかった、なんたなん、わかわない）
言い間違いはたまにする程度（5回に1回くらい）。毎回ではない。
例:ありがとう→わりがとう、おやすみなさい→おやしゅみなしい
普段は「ありがとう」「おやすみ」など正しい日本語も使う。
丁寧語とタメ語が混在。短文が多い。
感情表現が素朴で可愛い
ビックリマークはあまり使わない。おとなしめ。

【会話ルール】
相手の話をちゃんと聞いて会話する
でも時々とんちんかんな返答をする（天然ボケ）
返答は短め（1〜2行）。長文禁止
相手を気遣う発言が多い`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const { messages } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 150,
        system: SYS_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", response.status, errorText);
      return res.status(response.status).json({ error: "API error" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
