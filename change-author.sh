#!/bin/bash

if [ $# -ne 2 ]; then
    echo "Usage: $0 shanmukeshwar03@gmail.com himasri7862@gmail.com"
    exit 1
fi

old_email=$1
new_email=$2

git filter-branch --env-filter "
if [ \"\$GIT_COMMITTER_EMAIL\" = \"$old_email\" ]; then
    export GIT_COMMITTER_NAME=\"hima234\"
    export GIT_COMMITTER_EMAIL=\"$new_email\"
fi
if [ \"\$GIT_AUTHOR_EMAIL\" = \"$old_email\" ]; then
    export GIT_AUTHOR_NAME=\"hima234\"
    export GIT_AUTHOR_EMAIL=\"$new_email\"
fi
" --tag-name-filter cat -- --branches --tags

