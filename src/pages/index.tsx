import Head from "next/head";
import style from "@/styles/Home.module.scss";
import Header from "@/components/Molecules/Header/Header";
import WindowBox from "@/components/Organism/WindowBox/WindowBox";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import { useState } from "react";
import { listaGeneri } from "@/constants/common";
import Button from "@/components/Atoms/Button/Button";
import {
  GenerateContentCandidate,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import SwitchBox from "@/components/Molecules/SwitchBox/SwitchBox";
import Toast from "@/components/Atoms/Toast/Toast";

export default function Home() {
  const [protagonista, setProtagonista] = useState("");
  const [antagonista, setAntagonista] = useState("");
  const [genere, setGenere] = useState("");
  const [pegi18, setPegi18] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(false);
    const prompt = `genera un racconto ${genere} per ${
      pegi18 ? "adulti" : "bambini"
    }, con il protagonista chiamato ${protagonista} e l'antagonista chiamato ${antagonista}.`;

    if (
      protagonista.trim().length > 0 &&
      antagonista.trim().length > 0 &&
      genere.trim().length > 0
    ) {
      try {
        const response = await fetch("/api/generate", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        if (!data.ok) {
          throw new Error("errore");
        }
        setResponse(data.message);
      } catch (e) {
        console.error("il nostro errore:", e);
        setError(true);
      }
    }
    setLoading(false);
  };

  const handleVoice = () => {
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = "it-IT";
    setIsPlaying(true);
    speechSynthesis.speak(utterance);

    utterance.pitch = 1;

    utterance.onend = () => {
      setIsPlaying(false);
    };
  };

  const handleStopVoice = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };
  return (
    <>
      <Head>
        <title>Ai Story Teller</title>
        <meta name="description" content="AI based app to generate stories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header title="AI Story Teller" />
        <div className={style.content}>
          {error && (
            <Toast
              setAction={setError}
              title="Errore"
              message="Errore nella creazione del racconto"
            />
          )}

          <WindowBox title="Story Params">
            <div className={style.container}>
              <InputBox
                label="Nome Protagonista:"
                value={protagonista}
                setValue={setProtagonista}
              />
              <InputBox
                label="Nome Antagonista:"
                value={antagonista}
                setValue={setAntagonista}
              />
              <SelectBox
                label="Genere:"
                list={listaGeneri}
                setAction={setGenere}
              />
              <SwitchBox
                label="Per Adulti:"
                value={pegi18}
                setValue={setPegi18}
              />
              <Button
                label="Genera"
                onClick={handleGenerate}
                disabled={
                  protagonista.trim().length <= 0 ||
                  antagonista.trim().length <= 0 ||
                  genere.trim().length <= 0 ||
                  loading
                }
              />
            </div>
            {loading && (
              <div className={style.loading}>
                <p>loading...</p>
              </div>
            )}
            {!loading && response && (
              <div className={style.result}>
                <div className={style.btn}>
                  {isPlaying ? (
                    <Button label="Stop" onClick={handleStopVoice} />
                  ) : (
                    <Button label="Racconta" onClick={handleVoice} />
                  )}
                </div>
                {response}
              </div>
            )}
          </WindowBox>
        </div>
      </main>
    </>
  );
}
