import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateAbstract = async (title: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Sila tetapkan API KEY untuk menggunakan ciri AI.";

  try {
    const prompt = `Anda adalah seorang pembantu akademik untuk Jemaah Nazir. 
    Sila tulis satu abstrak ringkas (maksimum 50 patah perkataan) dalam Bahasa Melayu formal 
    untuk tajuk penulisan ilmiah berikut: "${title}".
    Abstrak haruslah padat dan menarik.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Gagal menjana abstrak.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ralat semasa menghubungi AI. Sila cuba lagi.";
  }
};