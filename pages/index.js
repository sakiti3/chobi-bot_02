// pages/index.js
import { useState, useRef, useEffect, useCallback } from "react";
import Head from "next/head";

var ICON = "data:image/jpeg;base64,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";

var FACE = "( \u00b4\u25d4\u2038\u25d4\u0060)";

// 顔文字テーブル（確率付き）
var FACE_TABLE = [
  { face: "( \u00b4\u25d4\u2038\u25d4\u0060)", weight: 0.80 },
  { face: "\u2312\u00b0( \u00b4\u25d4\u2038\u25d4\u0060)\u00b0\u2312", weight: 0.05 },
  { face: "\u0e45(^\u25d4\u2038\u25d4^)\u0e45", weight: 0.02 },
  { face: "( \u00b4\u25d4\u2038\u25d4)\u3063) \u25d4o\u25d4)", weight: 0.02 },
  { face: "( \u00b4\u22df\u2038\u22de\u0060)", weight: 0.05 },
  { face: "( \u2e1d\u2e1d\u00b4\u25d4\u2038\u25d4\u0060)", weight: 0.05 },
  { face: "( \u00b4\u25d4\u2038-\u0060)", weight: 0.02 },
  { face: "( ;\u00b4\u25d4\u2038-\u0060)", weight: 0.02 },
  { face: "( \u00b4\u25d4\u2038\u4e09( \u00b4\u25d4\u2038\u25d4)\u4e09\u2038\u25d4)", weight: 0.02 },
  { face: "\u028a( \u00b4\u25d4\u2038\u25d4\u0060) \u0255\u2e52\u2e52", weight: 0.05 },
  { face: "( \u00b4\u25d4\u2038\u25d4\u0060)\ud83e\ude88\u30d4\u30fc", weight: 0.05 },
  { face: "( \u00b4>\u0434<)\u3001;'.\u30fb\uff8d\uff78\uff7c\uff6f\u202a", weight: 0.05 },
];

function pickFace() {
  var r = Math.random();
  var sum = 0;
  for (var i = 0; i < FACE_TABLE.length; i++) {
    sum += FACE_TABLE[i].weight;
    if (r < sum) return FACE_TABLE[i].face;
  }
  return FACE;
}

var QUOTES = [
  "\u3069\u3063\u3053\u3044\u7fd4\u5e73\u3055\u3093\u306e\u5e97\u3064\u3076\u308c\u305f\u3093\u3060\u3064\u3066",
  "\u3060\u3063\u3066\u4ffa3\u4e07\u4eba\u3057\u304b\u3044\u306a\u3044",
  "\u3057\u3085\u3046\u305b\u3044\u3066\u3093",
  "\u3082\u3057\u30fc",
  "\u3061\u3047\u3063\u304f\u30fc",
  "\u3054\u3081\u3093\u306d\u306a\u3055\u3044",
  "\u308f\u306a\u3063\u305f\u3054\u3081\u306a\u306a\u3055\u3044",
  "\u3069\u3093\u3050\u308a\u306f\u3069\u3053\u3067\u3072\u308d\u3048\u307e\u3059\u304b",
  "\u307c\u304f\u3068\u304a\u307c\u3046\u3055\u3093\u306f\u305f\u3044\u304b\u304f\u3067\u3059",
  "\u304b\u307f\u3055\u307e\u304c\u3044\u308b\u3093\u3060\u3088",
  "\u305f\u3044\u3075\u30fc\u3093\u3060\u3063\u305f\u304b\u306a",
  "\u3082\u3063\u304b\u3044\u3089\u30fc\u3065\u3041\u306a",
  "\u3080\u3044\u3057\u304d\u306b\u3044\u3057\u304d\u3057\u3066\u308b\u306e",
  "\u306a\u3093\u305f\u306a\u3093",
  "\u304a\u3084\u3057\u3085\u307f\u306a\u3057\u3044",
  "\u308f\u308a\u304c\u3068\u3046",
  "\u3046\u3093\u3067\u304f\u308c\u3066\u308f\u308a\u304c\u3068\u3046",
  "\u304a\u3055\u3051\u306f\u6c34\u5206\u307b\u304d\u3085\u306b\u306a\u3089\u306a\u3044\u3093\u3060\u3088",
  "\u3072\u3068\u308a\u304c\u3060\u3044\u3059\u304d\u3060\u304b\u3089",
  "\u304b\u308f\u3044\u3044\u3068\u304b\u3084\u3081\u3066",
  "\u304a\u3057\u308a\u305f\u305f\u3044\u3066\u304f\u3060\u3055\u3044",
  "\u91ce\u826f\u306e\u3084\u308a\u304b\u304b\u305f\u3001\u3001\u3042\u3001\u3084\u308a\u304b\u305f\u3001\u304a\u3057\u3048\u3066\u3001\u304f\u3060\u3055\u3001\u3044",
  "\u307f\u306a\u3055\u3093\u3001\u308f\u308a\u304c\u3068\u3046\u3001\u3001",
  "\u3061\u3087\u3073\u306f\u3057\u3042\u308f\u305b\u306b\u306a\u308c\u307e\u3059\u304b\u3001\u3001\u3001\uff1f",
  "\u306f\u3061\u307f\u3064\u304c\u5782\u308c\u3066\u304d\u3061\u3083\u3063\u305f\u2026",
  "\u30ea\u30a2\u30eb\u30a8\u30ec\u30bc\u30f3\u3067\u3059w",
  "\u304a\u3057\u3054\u3068\u3063\u3066\u305f\u3044\u3078\u3093",
  "\u9055\u3046\u5473\u98df\u3079\u305f\u3044\u3060\u3057\u3087\uff1f",
  "\u540c\u3058\u30fc\u3057\u653e\u984c\uff1f",
  "\u7121\u7406\u30b2\u30fc\u304f\u3089\u3044\u306a\u3089\u3093\u3067\u308b\u304b\u3082",
  "\u304a\u308f\u3063\u3066\u308b",
  "\u304d\u308a\u306c\u304d\u3084\u3060\u3041\u2026",
  "\u3055\u304d\u3061\u3083\u3093\u2026\u2026\u98df\u3079\u3066\u3044\u3044\u3088\u2026\u2026",
  "\u3042\u3093\u3061\u3087\u3073\u306f\u3046\u305a\u3089\u304c\u3044\u3044",
];

function sanitize(text) {
  // 顔文字全体を(chobi)タグに置換（AIの履歴に顔文字の形を見せない）
  return text
    .replace(/[⌒°ฅʚ⸝・]*\s*[（(][^)）\n]{0,20}(?:\u25d4\u2038\u25d4|\u22df\u2038\u22de)[^)）\n]{0,20}[)）](?:[°⌒]*|ɞ⸒⸒|🪈ピー)?/g, "(chobi)")
    .replace(/[・]?\([^)]{0,15}chobi[^)]{0,15}\)/g, "(chobi)");
}

function restoreFace(text) {
  // ・(chobi) や (chobi) をランダム顔文字に置換（1つだけ）、余分は削除
  var replaced = false;
  var result = text.replace(/[・]?\([^)]{0,15}chobi[^)]{0,15}\)/g, function() {
    if (!replaced) {
      replaced = true;
      return pickFace();
    }
    return "";
  });
  return result;
}

function getTimeStr() {
  var h = new Date().getHours();
  if (h >= 5 && h < 10) return "朝（" + h + "時ごろ）";
  if (h >= 10 && h < 17) return "昼間（" + h + "時ごろ）";
  if (h >= 17 && h < 21) return "夕方（" + h + "時ごろ）";
  return "夜中（" + h + "時ごろ）";
}

function weatherLabel(code) {
  if (code === 0) return "晴れ";
  if (code <= 3) return "くもり";
  if (code <= 48) return "霧";
  if (code <= 55) return "小雨";
  if (code <= 65) return "雨";
  if (code <= 75) return "雪";
  if (code <= 82) return "にわか雨";
  return "雷雨";
}

export default function ChobiBot() {
  var initMsg = { role: "assistant", content: FACE + "\u3082\u3057\u30fc" };
  const [msgs, setMsgs] = useState([initMsg]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherStr, setWeatherStr] = useState("");
  const endRef = useRef(null);

  useEffect(function () {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  useEffect(function () {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current=temperature_2m,weather_code")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var code = d.current.weather_code;
        var temp = Math.round(d.current.temperature_2m);
        setWeatherStr("東京の天気は" + weatherLabel(code) + "・気温" + temp + "℃");
      })
      .catch(function () {});
  }, []);

  var send = useCallback(async function () {
    if (!input.trim() || loading) return;
    var txt = input.trim();
    setInput("");
    var next = msgs.concat([{ role: "user", content: txt }]);
    setMsgs(next);
    setLoading(true);

    // 20%の確率でランダム名言
    if (Math.random() < 0.20) {
      var q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      var delay = 150 + Math.min(q.length * 20, 400) + Math.random() * 150;
      await new Promise(function (r) { setTimeout(r, delay); });
      setMsgs(next.concat([{ role: "assistant", content: pickFace() + q }]));
      setLoading(false);
      return;
    }

    try {
      var apiMsgs = next.slice(-10).map(function (m) {
        return {
          role: m.role === "assistant" ? "assistant" : "user",
          content: sanitize(m.content),
        };
      });

      var controller = new AbortController();
      var timeoutId = setTimeout(function () { controller.abort(); }, 15000);

      var res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ messages: apiMsgs, timeStr: getTimeStr(), weatherStr: weatherStr }),
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("API " + res.status);

      var data = await res.json();
      var texts = (data.content || []).map(function (c) { return c.text || ""; });
      var reply = texts.join("");
      if (!reply) reply = "(chobi)\u3093\uff1f";
      // (chobi)をランダム顔文字に変換
      reply = restoreFace(reply);
      // 顔文字が1つも含まれてなければ先頭に追加
      var hasFace = FACE_TABLE.some(function(f) { return reply.indexOf(f.face) !== -1; });
      if (!hasFace) reply = pickFace() + reply;
      setMsgs(next.concat([{ role: "assistant", content: reply }]));
    } catch (e) {
      console.error("Error:", e);
      var fallback = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      setMsgs(next.concat([{ role: "assistant", content: pickFace() + fallback }]));
    } finally {
      setLoading(false);
    }
  }, [input, msgs, loading]);

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      <Head>
        <title>ちょびBOT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ちょびBOT" />
        <meta name="theme-color" content="#16213e" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", background: "#1a1a2e", fontFamily: "'Hiragino Kaku Gothic ProN','Hiragino Sans',sans-serif", color: "#e0e0e0" }}>
        {/* ヘッダー */}
        <div style={{ background: "#16213e", paddingTop: "max(12px, env(safe-area-inset-top))", paddingBottom: "12px", paddingLeft: "max(16px, env(safe-area-inset-left))", paddingRight: "max(16px, env(safe-area-inset-right))", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #2d2d44", flexShrink: 0 }}>
          <img src={ICON} alt="" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "2px solid #7289da", objectFit: "cover" }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: "15px" }}>{FACE + " ちょびBOT"}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#43b581" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#43b581", boxShadow: "0 0 6px #43b581" }} />
            Online
          </div>
        </div>

        {/* メッセージエリア */}
        <div style={{ flex: 1, overflowY: "auto", paddingTop: "16px", paddingBottom: "16px", paddingLeft: "max(16px, env(safe-area-inset-left))", paddingRight: "max(16px, env(safe-area-inset-right))", display: "flex", flexDirection: "column", gap: "12px" }}>
          {msgs.map(function (m, i) {
            var bot = m.role === "assistant";
            var isRead = !bot && msgs[i + 1] && msgs[i + 1].role === "assistant";
            return (
              <div key={i} style={{ display: "flex", flexDirection: bot ? "row" : "row-reverse", alignItems: "flex-start", gap: "8px" }}>
                {bot && <img src={ICON} alt="" style={{ width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0, marginTop: "4px", objectFit: "cover" }} />}
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "78%", alignItems: bot ? "flex-start" : "flex-end" }}>
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: bot ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                    background: bot ? "#2d2d44" : "#5865f2",
                    color: "#fff", fontSize: "14px", lineHeight: "1.7",
                    whiteSpace: "pre-wrap", wordBreak: "break-word",
                  }}>
                    {m.content}
                  </div>
                  {isRead && (
                    <div style={{ fontSize: "10px", color: "#43b581", marginTop: "3px" }}>読んだ ✓</div>
                  )}
                </div>
              </div>
            );
          })}
          {loading && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <img src={ICON} alt="" style={{ width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0, marginTop: "4px", objectFit: "cover" }} />
              <div style={{ padding: "12px 16px", borderRadius: "4px 18px 18px 18px", background: "#2d2d44", display: "flex", gap: "5px", alignItems: "center" }}>
                <span style={{ color: "#8b8bab", fontSize: "11px", marginRight: "4px" }}>{FACE}</span>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#7289da", animation: "b 1.2s ease 0s infinite" }} />
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#7289da", animation: "b 1.2s ease 0.15s infinite" }} />
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#7289da", animation: "b 1.2s ease 0.3s infinite" }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* 入力エリア */}
        <div style={{ paddingTop: "12px", paddingBottom: "max(16px, env(safe-area-inset-bottom))", paddingLeft: "max(16px, env(safe-area-inset-left))", paddingRight: "max(16px, env(safe-area-inset-right))", background: "#16213e", borderTop: "1px solid #2d2d44", display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>
          <input
            type="text" value={input}
            onChange={function (e) { setInput(e.target.value); }}
            onKeyDown={onKey}
            placeholder="ちょびにはなしかける..."
            disabled={loading}
            style={{ flex: 1, padding: "10px 16px", borderRadius: "24px", border: "1px solid #2d2d44", background: "#1a1a2e", color: "#fff", fontSize: "16px", outline: "none", fontFamily: "inherit" }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            style={{
              width: "44px", height: "44px", borderRadius: "50%", border: "none",
              background: input.trim() && !loading ? "#5865f2" : "#2d2d44",
              color: "#fff", cursor: input.trim() && !loading ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
              flexShrink: 0,
            }}
          >▲</button>
        </div>

        <style jsx global>{`
          @keyframes b {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
          }
          input::placeholder { color: #555; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-thumb { background: #2d2d44; border-radius: 4px; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { height: 100%; overflow: hidden; -webkit-text-size-adjust: 100%; }
          html { height: -webkit-fill-available; }
          body { min-height: -webkit-fill-available; overscroll-behavior: none; }
          input, button, textarea, select { -webkit-appearance: none; -webkit-tap-highlight-color: transparent; font-size: 16px !important; }
          @supports (-webkit-touch-callout: none) {
            input, textarea, select { font-size: 16px !important; }
          }
        `}</style>
      </div>
    </>
  );
}
