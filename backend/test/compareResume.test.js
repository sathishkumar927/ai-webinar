import assert from "node:assert/strict";
import test from "node:test";
import { compareResume } from "../src/services/compareResume.js";

test("scores skills required by the job description", () => {
  const result = compareResume(
    "Experienced JavaScript developer with React and Node.js experience.",
    "We need JavaScript, React, TypeScript and Node.js.",
  );

  assert.deepEqual(result, {
    score: 75,
    skillsFound: ["JavaScript", "Node.js", "React"],
    skillsMissing: ["TypeScript"],
    totalSkills: 4,
  });
});

test("does not match short skill names inside other words", () => {
  const result = compareResume("GitHub contributor", "Looking for a Java engineer.");

  assert.deepEqual(result.skillsFound, []);
  assert.deepEqual(result.skillsMissing, ["Java"]);
  assert.equal(result.score, 0);
});

test("reports when the job description has no supported skill keywords", () => {
  assert.throws(
    () => compareResume("Experienced developer", "A great opportunity for a motivated person."),
    { message: "The job description does not include any supported skill keywords.", statusCode: 422 },
  );
});
