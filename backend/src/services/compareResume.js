const skillDefinitions = [
  ["Accessibility", ["accessibility", "a11y"]],
  ["Agile", ["agile"]],
  ["Angular", ["angular"]],
  ["AWS", ["aws", "amazon web services"]],
  ["Azure", ["azure"]],
  ["C", ["c language"]],
  ["C#", ["c#"]],
  ["C++", ["c\\+\\+"]],
  ["CI/CD", ["ci/cd", "continuous integration", "continuous deployment"]],
  ["CSS", ["css"]],
  ["Docker", ["docker"]],
  ["Express", ["express", "express.js"]],
  ["GCP", ["gcp", "google cloud"]],
  ["Git", ["git"]],
  ["GraphQL", ["graphql"]],
  ["HTML", ["html"]],
  ["Java", ["java"]],
  ["JavaScript", ["javascript"]],
  ["Jest", ["jest"]],
  ["Kubernetes", ["kubernetes", "k8s"]],
  ["Machine Learning", ["machine learning", "ml"]],
  ["MongoDB", ["mongodb"]],
  ["MySQL", ["mysql"]],
  ["Next.js", ["next.js", "nextjs"]],
  ["Node.js", ["node.js", "nodejs"]],
  ["PHP", ["php"]],
  ["Playwright", ["playwright"]],
  ["PostgreSQL", ["postgresql", "postgres"]],
  ["Python", ["python"]],
  ["React", ["react"]],
  ["React Native", ["react native"]],
  ["Redis", ["redis"]],
  ["REST APIs", ["rest api", "restful api"]],
  ["Ruby", ["ruby"]],
  ["SQL", ["sql"]],
  ["Testing", ["testing", "test automation"]],
  ["TypeScript", ["typescript"]],
  ["Vue.js", ["vue.js", "vuejs"]],
];

function containsPhrase(text, phrase) {
  return new RegExp(`(^|[^a-z0-9])${phrase}(?=$|[^a-z0-9])`, "i").test(text);
}

function findSkills(text) {
  return skillDefinitions
    .filter(([, aliases]) => aliases.some((alias) => containsPhrase(text, alias)))
    .map(([skill]) => skill);
}

export function compareResume(resumeText, jobDescription) {
  const requiredSkills = findSkills(jobDescription);
  if (requiredSkills.length === 0) {
    const error = new Error("The job description does not include any supported skill keywords.");
    error.statusCode = 422;
    throw error;
  }

  const resumeSkills = new Set(findSkills(resumeText));
  const skillsFound = requiredSkills.filter((skill) => resumeSkills.has(skill));
  const skillsMissing = requiredSkills.filter((skill) => !resumeSkills.has(skill));

  return {
    score: Math.round((skillsFound.length / requiredSkills.length) * 100),
    skillsFound,
    skillsMissing,
    totalSkills: requiredSkills.length,
  };
}
