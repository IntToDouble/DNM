const github = require("@actions/github");
const context = github.context;
const { issue_number } = context.issue;
const commentIdentifier = "<!-- do-not-merge-comment -->";
const stringLocations = process.env.STRING_LOCATIONS;
const searchString = process.env.SEARCH_STRING;

if (!process.env.GITHUB_TOKEN) {
  return console.log("Skipping PR comment update. No GITHUB_TOKEN provided.");
}

if (context.eventName !== "pull_request") {
  return console.log("Skipping PR comment update. This is not a pull request.");
}

const commentBody = (foundString, stringLocations) => {
  if (foundString) {
    return `${commentIdentifier}\n⚠️ The string '${searchString}' was found in the changes. Please remove it before merging.\n\nLocations:\n \`\`\`\n${stringLocations}\n \`\`\``;
  } else {
    return `${commentIdentifier}\n✅ The '${searchString}' string was not found in the changes. You're good to go!`;
  }
};
const main = async () => {
  const existingComments = await github.rest.issues.listComments({
    ...context.repo,
    issue_number,
  });

  const customStringCheckComment = existingComments.data.find((comment) =>
    comment.body.includes(commentIdentifier)
  );

  const payload = {
    ...context.repo,
    comment_id: customStringCheckComment.id,
    body: commentBody(Boolean(stringLocations), stringLocations),
  };

  if (customStringCheckComment) {
    await github.rest.issues.updateComment(payload);
  } else {
    await github.rest.issues.createComment(payload);
  }
};

main();
