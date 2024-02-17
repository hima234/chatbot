#!/bin/bash
new_email="himasri7862@gmail.com"
new_name="hima234"

git filter-branch -f --env-filter "
if [ \"$GIT_COMMITTER_EMAIL\" != \"$new_email\" ]; then
    export GIT_COMMITTER_NAME=\"$new_name\"
    export GIT_COMMITTER_EMAIL=\"$new_email\"
fi
if [ \"$GIT_AUTHOR_EMAIL\" != \"$new_email\" ]; then
    export GIT_AUTHOR_NAME=\"$new_name\"
    export GIT_AUTHOR_EMAIL=\"$new_email\"
fi" --tag-name-filter cat -- --branches --tags