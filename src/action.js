const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        //Get the repo token 
        const token = core.getInput("repo-access-token", { required: true });
        const context = github.context;
        
        if(context.payload.pull_request == undefined){
            throw new Error("Can't get pull request payload");
        }

        const {assignees, number, user: { login: author }}  = context.payload.pull_request;
        
        if(assignees.length > 0){
            core.info(`Pull request already assigned`);
        } else {    
            const octokit = github.getOctokit(token);
            await octokit.rest.issues.addAssignees({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: number,
                assignees : [author]
            });
            core.info(`@${author} has been assigned to the pull request @${number}`);
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();