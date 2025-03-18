import React from "react";
import { FaForward } from "react-icons/fa";
import styles from "./TeamGameEndScreen.module.css";

function TeamGameEndScreen({
  score,
  totalScores,
  matchesPlayed,
  totalMatches,
  onNextMatch,
  onReset,
}) {
  const totalScoresList = Object.entries(totalScores).map(
    ([player, score]) => ({ player, score })
  );
  const maxScore =
    totalScoresList.length > 0
      ? Math.max(...totalScoresList.map((p) => p.score))
      : 0;
  const winners = totalScoresList.filter((p) => p.score === maxScore);
  const isTie = winners.length > 1;

  return (
    <div className={styles.endScreen}>
      {matchesPlayed < totalMatches ? (
        <div className={styles.endOfRoundContent}>
          <h3>Parabéns, jogador acertou {score} ponto(s).</h3>
          <p>Pronto para a próxima partida?</p>
          <button className={styles.nextButton} onClick={onNextMatch}>
            <FaForward /> Próxima Partida
          </button>
        </div>
      ) : (
        <div>
          <h3>Parabéns, jogadores!</h3>
          <p>Resultados:</p>
          <ul className={styles.resultsList}>
            {totalScoresList.map(({ player, score }) => (
              <li key={player}>
                <span>{player}</span>: {score} pontos
              </li>
            ))}
          </ul>
          {isTie ? (
            <h4 className={styles.winner}>Empate!</h4>
          ) : (
            <h4 className={styles.winner}>Vencedor: {winners[0].player}</h4>
          )}
          <div className={styles.buttons}>
            <button className={styles.restartButton} onClick={onReset}>
              Reiniciar
            </button>
            <button
              className={styles.homeButton}
              onClick={() => window.location.reload()}
            >
              Voltar para Início
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamGameEndScreen;
