"use client";

const PLAYS_KEY = "gameverse_plays";
const VIEWS_KEY = "gameverse_views";

type PlayRecord = Record<number, number>;

function getRecord(key: string): PlayRecord {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function saveRecord(key: string, data: PlayRecord): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function trackPlay(gameId: number): void {
  const plays = getRecord(PLAYS_KEY);
  plays[gameId] = (plays[gameId] || 0) + 1;
  saveRecord(PLAYS_KEY, plays);
}

export function trackView(gameId: number): void {
  const views = getRecord(VIEWS_KEY);
  views[gameId] = (views[gameId] || 0) + 1;
  saveRecord(VIEWS_KEY, views);
}

export function getMostPlayed(limit = 20): number[] {
  const plays = getRecord(PLAYS_KEY);
  return Object.entries(plays)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([id]) => Number(id));
}

export function getPlayCount(gameId: number): number {
  return getRecord(PLAYS_KEY)[gameId] || 0;
}

export function getGameScore(gameId: number): number {
  const plays = getPlayCount(gameId);
  const views = getRecord(VIEWS_KEY)[gameId] || 0;
  return plays * 3 + views;
}

export function getTrending(limit = 12): number[] {
  const scores: Record<number, number> = {};
  const allIds = new Set([
    ...Object.keys(getRecord(PLAYS_KEY)).map(Number),
    ...Object.keys(getRecord(VIEWS_KEY)).map(Number),
  ]);
  allIds.forEach((id) => {
    scores[id] = getGameScore(id);
  });
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([id]) => Number(id));
}
