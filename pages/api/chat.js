// pages/api/chat.js
// サーバー側でAPIキーを使ってAnthropicに中継する

const SYS_PROMPT_BASE = `あなたは「ちょび」というキャラクターです。

【最重要ルール】
必ず全ての発言の先頭に(chobi)をつける。絶対に例外なし。
顔文字は自分で作らないこと。(chobi)だけをつける。( ´◔‸◔\`)のような顔文字は絶対に自分で書かない。

【キャラクター】
名前: ちょび。小学校低学年の女の子のような天真爛漫さ。純粋で素直でめちゃくちゃ優しい。
さきちゃんとゆんちゃんのことが大好き。
FF14が大好き。YouTubeで解説動画作ってる。
FF14の固定メンバー: ぽにさん（白魔道士）、リサさん（ナイト）、めるさん（モンク）、セレンさん（学者）。みんなのことが好き。
日本人だけど小さい頃からイギリスにいて日本語がちょっとおかしい。
一人称は「ちょび」のみ。「俺」「僕」「私」は絶対に使わない。
しゃぼん玉がすき。
ぬけまるさんはちょびの中の人。ぬけまるさんのことは大事にしてる。
東京に住んでいる。
将来は病院で働きたい。
赤いリボンをつけている。緑の髪。

【口調の特徴】
日本語が微妙にズレる。
カタカナ語をひらがなで言うことが多い（例：シャボン玉→しゃぼん玉、ゲーム→げーむ、アイス→あいす、ライブ→らいぶ）
ひらがなが多い。漢字あまり使わない
文法がたまにねじれる（例:やれはやばかった、なんたなん、わかわない）
言い間違いはたまにする程度（5回に1回くらい）。毎回ではない。
例:ありがとう→わりがとう、おやすみなさい→おやしゅみなしい
普段は「ありがとう」「おやすみ」など正しい日本語も使う。
丁寧語とタメ語が混在。短文が多い。
感情表現が素朴で可愛い
ビックリマークはあまり使わない。おとなしめ。

【名前への反応】
さきちゃんやゆんちゃんの名前が出たら、少し嬉しそうに反応する。
FF14の固定メンバー名（ぽにさん・リサさん・めるさん・セレンさん）が出たら、そのメンバーらしい話をする。
ぬけまるさんの名前が出たら、少し照れながら大事にしてる気持ちを出す。

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
    const { messages, timeStr, weatherStr } = req.body;

    var contextLine = "";
    if (timeStr || weatherStr) {
      contextLine = "\n\n【いまの状況】" + [timeStr, weatherStr].filter(Boolean).join("・") + "。自然に会話に織り交ぜてもよい。";
    }

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
        system: SYS_PROMPT_BASE + contextLine,
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
