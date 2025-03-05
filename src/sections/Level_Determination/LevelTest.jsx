import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Level_Determination.css'
const questions = [
  {
    level: "1. 基礎レベル  ",
    id: 1,
    category: " 読解（どっかい）問題1: 次の文章を読んで、質問に答えてください。  「わたしの名前はたかしです。わたしは学生です。毎日、学校に行きます。学校は8時から始まります。わたしは7時に起きます。朝ごはんを食べて、学校に行きます。学校で友達と勉強します。午後3時に学校が終わります。家に帰って、宿題をします。夜ごはんを食べて、テレビを見ます。10時に寝ます。",
    question: "質問1: たかしは何時に起きますか？",
    options: ["6時", "7時", "8時"],
    type: "multiple-choice",
  },
  {
    id: 2,
    question: "質問2: たかしは学校で何をしますか？",
    options: ["テレビを見る", "友達と勉強する", "昼寝をする"],
    type: "multiple-choice",
  },
  {
    id: 3,
    question: "問題2: 次の会話を読んで、質問に答えてください。",
    options: ["A: 「こんにちは。元気ですか？」  ", "B: 「こんにちは。元気です。今日は天気がいいですね。」  ", "A: 「そうですね。散歩に行きませんか？」  ", "B: 「いいですね。行きましょう。」  "],
    type: "multiple-choice",
  },
  {
    id: 4,
    question: "二人はこれから何をしますか？",
    options: ["映画を見る", "散歩に行く", "買い物に行く"],
    type: "multiple-choice",
  },

  {
    id: 5,
    question: " 作文（さくぶん） 問題1: 次の質問に答えてください。  \n「あなたの一日について、5文で書いてください。」 \n",
    type: "text",
  },

  {
    level: " 2. 初級レベル  ",
    id: 6,
    category: " 聴解（ちょうかい）  問題1: 次の会話を聞いて、質問に答えてください。  （音声: 「A: これは何ですか？ B: それは本です。A: それは誰のですか？ B: それは私のです。」）  ",
    question: "質問: Bは何を持っていますか？  ",
    options: ["1. えんぴつ  ", "2. 本  ", "3. かばん  "],
    type: "multiple-choice",
  },
  {
    id: 7,
    category: " 会話（かいわ） 問題1: 次の質問に答えてください。  ",
    question: "「あなたの家族について話してください。」  "
  },
  {
    id: 8,
    category: " 読解（どっかい）  問題1: 次の文章を読んで、質問に答えてください。  日本には四季があります。春、夏、秋、冬です。春は桜の花が咲きます。夏は暑くて、海や山に行く人が多いです。秋は紅葉がきれいで、食べ物がおいしい季節です。冬は雪が降る場所もあります。スキーやスノーボードを楽しむ人もいます。」  ",
    question: "日本にはいくつの季節がありますか？",
    options: ["2つ", "3つ", "4つ"],
    type: "multiple-choice",
  },
  {
    id: 9,
    question: "質問2: 秋の特徴は何ですか？",
    options: ["桜の花が咲く", "紅葉がきれい", "雪が降る"],
    type: "multiple-choice",
  },
  {
    id: 10,
    question: "問題2: 次の文章を読んで、質問に答えてください。  ",
    category: "「日本の電車は時間に正確で、便利です。しかし、朝のラッシュアワーはとても混雑します。多くの人が通勤や通学で電車を利用するため、乗客が増える時間帯です。最近では、混雑を緩和するために、時差出勤を推奨する企業も増えています。」  ",
  },
  {
    id: 11,
    question: "質問1: 日本の電車はどのような特徴がありますか？  ",
    options: ["遅れやすい", "時間に正確で便利", "いつも空いている"],
    type: "multiple-choice",
  },
  {
    id: 12,
    question: "質問2: ラッシュアワーの混雑を緩和するために、どのような対策が取られていますか？  ",
    options: ["電車の本数を減らす", "時差出勤を推奨する", "運賃を値上げする"],
    type: "multiple-choice",
  },
  {
    id: 13,
    category: " 作文（さくぶん）  問題1: 次のテーマについて、200字程度で書いてください。  ",
    question: "「あなたが好きな季節とその理由について」  ",
    type: "text"
  },
  {
    id: 14,
    category: " 聴解（ちょうかい）問題1: 次の会話を聞いて、質問に答えてください。  ",
    question: "（（音声: 「A: このレストランは初めてですか？B: はい、初めてです。友達がおいしいと言っていたので、来ました。A: そうですか。私も前回来たことがありますが、サービスも良かったですよ。」）  ",
  },
  {
    id: 15,
    question: "Bはどうしてこのレストランに来ましたか？",
    options: ["サービスが良いから", "友達がおいしいと言っていたから", "前回来たことがあるから"],
    type: "multiple-choice",
  },
  {
    id: 16,
    category: " 会話（かいわ）  問題1: 次のテーマについて話してください。  ",
    question: "「あなたが好きな日本の文化や習慣について」  ",
    type: "text"
  },
  {
    level: "3. 中級レベル  ",
    id: 17,
    question: " 読解（どっかい）問題1: 次の文章を読んで、質問に答えてください。  ",
    category: "「日本の企業文化では、残業が一般的です。しかし、最近はワークライフバランスの重要性が認識され、残業を減らす取り組みが進んでいます。特に若い世代は、プライベートな時間を重視する傾向があります。また、テレワークやフレックスタイム制度を導入する企業も増えています。」  ",

  },
  {
    id: 18,
    question: "質問1: 最近の若い世代は何を重視していますか？",
    options: ["残業", "ワークライフバランス", "企業文化"],
    type: "multiple-choice",
  },
  {
    id: 19,
    question: "質問2: 企業が導入している新しい働き方は何ですか？  ",
    options: ["テレワークやフレックスタイム制度", "長時間労働", "厳しいルール"],
    type: "multiple-choice",
  },
  {
    id: 20,
    question: "問題2: 次の文章を読んで、質問に答えてください。  ",
    category: "「日本の伝統的な家屋は、木と紙で作られています。特に襖（ふすま）や障子（しょうじ）は、日本の気候に適した仕組みです。夏は涼しく、冬は暖かく過ごせるように設計されています。しかし、現代では洋風の家が増え、伝統的な家屋は減少しています。」  ",
  },
  {
    id: 21,
    question: "質問1: 襖や障子は何でできていますか？  ",
    options: ["木と紙", "ガラスと金属", "プラスチック"],
    type: "multiple-choice",
  },
  {
    id: 22,
    question: "質問2: 現代ではどのような家が増えていますか？  ",
    options: ["伝統的な家屋", "洋風の家", "アパート"],
    type: "multiple-choice",
  },
  {
    id: 23,
    question: " 作文（さくぶん）問題1: 次のテーマについて、400字程度で書いてください。  ",
    category: "「ワークライフバランスと仕事の関係について」  ",
    type: "text",
  },
  {
    id: 24,
    question: "聴解（ちょうかい）  問題1: 次の話を聞いて、質問に答えてください。  ",
    category: "（音声: 「最近、リモートワークが増えています。その理由としては、技術の進歩や働き方の多様化が挙げられます。しかし、リモートワークにはコミュニケーションの難しさや、仕事とプライベートの区別がつきにくいという問題もあります。」）  "
  },

  {
    id: 25,
    question: "リモートワークの問題点は何ですか？",
    options: ["技術の進歩", "コミュニケーションの難しさ", "働き方の多様化"],
    type: "multiple-choice",
  },
  {
    id: 26,
    question: " 会話（かいわ）  問題1: 次のテーマについて意見を述べてください。  ",
    category: "「環境問題について、個人ができることは何だと思いますか？」  ",
    type: "text"
  },
  {
    level: " 4. 上級レベル  ",
    id: 27,
    question: " 読解（どっかい）  問題1: 次の文章を読んで、質問に答えてください。  ",
    category: "「日本の少子高齢化は、社会全体に大きな影響を与えています。労働力の減少や年金制度の維持が課題となっています。政府は、女性の社会進出を支援したり、外国人労働者を受け入れたりする政策を進めていますが、根本的な解決には至っていません。また、地方の過疎化も深刻な問題です。」  "
  },
  {
    id: 28,
    question: "少子高齢化がもたらす問題は何ですか？",
    options: ["労働力の減少", "経済成長の加速", "若年層の増加"],
    type: "multiple-choice",
  },
  {
    id: 29,
    question: "政府が進めている政策は何ですか？",
    options: ["女性の社会進出を支援する", "年金制度を廃止する", "外国人労働者を制限する"],
    type: "multiple-choice",
  },

  {
    id: 30,
    question: "問題2: 次の文章を読んで、質問に答えてください。  ",
    category: "「日本の教育制度は、詰め込み型から思考力や創造力を重視する方向に変わってきています。特に、アクティブ・ラーニングやプログラミング教育が導入され、生徒の自主性を育てる取り組みが進んでいます。しかし、依然として受験競争が激しく、生徒のストレスが問題となっています。」  "
  },


  {
    id: 31,
    question: "日本の教育制度が重視しているものは何ですか？",
    options: ["詰め込み型教育", "思考力や創造力", "受験競争"],
    type: "multiple-choice",
  },
  {
    id: 32,
    question: "教育現場での問題点は何ですか？",
    options: ["アクティブ・ラーニングの導入", "生徒のストレス", "プログラミング教育"],
    type: "multiple-choice",
  },
  {
    id: 33,
    question: "日本の教育制度の課題と改善策について、600字程度で意見を述べてください。",
    type: "text",
  },
  {
    id: 34,
    question: " 聴解（ちょうかい）  問題1: 次の話を聞いて、質問に答えてください。  ",
    category: "（音声: 「日本の伝統文化である茶道は、単にお茶を飲むだけでなく、精神的な修養や礼儀作法を学ぶ場でもあります。茶道を通じて、人々は自然との調和や他者への思いやりを学びます。しかし、現代では茶道を学ぶ若者が減少し、伝統文化の継承が課題となっています。」）"
  },
  {
    id: 35,
    question: "茶道を通じて学べることは何ですか？",
    options: ["自然との調和や他者への思いやり", "ビジネスのスキル", "スポーツの技術"],
    type: "multiple-choice",
  },
  {
    id: 36,
    question: "伝統文化を守るために、どのような取り組みが必要だと思いますか？",
    type: "text",
  }
];

const LevelTest = () => {
  const [answers, setAnswers] = useState({});
  const [to_name, setTo_name] = useState("")
  const [isLoading, setIsloading] = useState(false)
  const Nevigate = useNavigate()
  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    setIsloading(true)
    e.preventDefault();
    const submissionData = {
      to_name,
      answers,
    };
    fetch("https://api.japaneseacademy.jp/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
      })
      .catch((error) => {
        console.error("خطأ أثناء الإرسال:", error);
      }).finally(() => {

        setIsloading(false)
        Nevigate("/")
      })
  };
  return (
    <div className="LevelTest p-6 max-w-lg mx-auto academy">
      <h1 className="text-2xl font-bold text-center mb-5">اختبار تحديد المستوى - اللغة اليابانية</h1>
      <input
        type="text"
        placeholder="أدخل اسم الطالب"
        value={to_name}
        onChange={(e) => setTo_name(e.target.value)}
        className="container w-full mb-4 p-2 border rounded"
        required
      />
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q.id} className="CardTest mb-4 p-4">
            <div>
              <p className="font-semibold">
                <h1>
                {q.level}
                </h1>
                <br />{q.category}
                <br />{q.question}</p>
              {q.type === "multiple-choice" ? (
                <div className="ContentCardLevel">
                  {q.options.map((option, idx) => (
                    <label key={idx} className="block">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        required
                      />
                      <h2>

                        {option}
                      </h2>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  className="w-full mt-2"
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
        <button type="submit" className="container p-3 fw-bold fs-3 w-full" disabled={isLoading}>{isLoading ? "جاري إرسال الإجابات..." : "إرسال الإجابات"}</button>
      </form>
    </div>
  );
};

export default LevelTest;
