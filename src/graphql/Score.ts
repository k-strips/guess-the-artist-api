import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Score = objectType({
  name: "Score",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("playerName");
    t.nonNull.int("score");
  },
});

let scores: NexusGenObjects["Score"][] = [
  {
    id: "sdf9843r",
    playerName: "mark hanson",
    score: 20,
  },
  {
    id: "34rjfo3",
    playerName: "cindy lawson",
    score: 15,
  },
];

export const ScoreQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("scores", {
      type: "Score",
      resolve(parent, args, context, info) {
        const allScores = context.prisma.score.findMany();
        return allScores;
      },
    });
  },
});

export const ScoreMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addScore", {
      type: "Score",
      args: {
        playerName: nonNull(stringArg()),
        score: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const newScore = context.prisma.score.create({
          data: {
            playerName: args.playerName,
            score: args.score,
          },
        });
        return newScore;
      },
    });
  },
});

//   const { playerName, score } = args;
//   let idCount = scores.length + 1;
//   const newScore = {
//     id: `score-${idCount}`,
//     playerName,
//     score,
//   };
//   scores = [...scores, newScore];
//   return scores;
// }),
