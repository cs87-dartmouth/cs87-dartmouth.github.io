# How to use this file...
#
# "make deploy":
#	Just uploads any updated files from your local machine. ("make drydeploy"
#	will do a dry-run of this.)
#
# User-set makefile variables...
#
# localdir:    path to site files on personal machine (end with slash)
# remoteuser:  username for logging into server
# remotehost:  server host name
# remotedir:   path to site files on server (end with slash)
#
# switches:    rsync switches for both uploading and downloading files
# putswitches: rsync switches for uploading files only
#
# putmessage:  message to echo before uploading files
#
# Optional comand line - tdir - specific target directory
tdir		:=/

localdir     = .
remoteuser   = f00274s
remotehost   = www.cs.dartmouth.edu
remotedir    = /home/wjarosz/public_html/courses/cs1-sp21

switches     = -arvuz --delete --exclude-from 'internal/exclude-list.txt'
putswitches  = --exclude "logs"

putmessage   = Updating server with newer files from local site mirror...

# In normal circumstances, nothing below this comment should need modification:
# essentially everything is configurable using the variables above.

# "--update" is hardcoded into the downloading commands because if it weren't
# there, local changes would be overwritten by (older) live versions of files
# before ever getting uploaded to the server.

sd = $(patsubst %/,%,$(tdir))

## Deploy the files to the server
deploy:
	@echo "$(putmessage)"
	rsync $(putswitches) $(switches) $(localdir)$(sd)/ $(remoteuser)@$(remotehost):$(remotedir)$(sd)/
	@echo

## Test deploying the files to the server
dry-deploy:
	@echo "DRY RUN: $(putmessage)"
	rsync --dry-run $(putswitches) $(switches) $(localdir)$(sd)/ $(remoteuser)@$(remotehost):$(remotedir)$(sd)/
	@echo

## Delete extrenous files on the remote
delete-extraneous-on-remote:
	rsync $(putswitches) -arvuz --delete --existing --ignore-existing --exclude '/courses/' $(localdir)$(sd)/ $(remoteuser)@$(remotehost):$(remotedir)$(sd)/
	@echo

## Test which extrenous files would be deleted on the remote
dry-delete-extraneous-on-remote:
	rsync $(putswitches) -arvuzn --delete --existing --ignore-existing --exclude '/courses/' $(localdir)$(sd)/ $(remoteuser)@$(remotehost):$(remotedir)$(sd)/
	@echo

.PHONY: FORCE clean deploy dry-deploy delete-extraneous-on-remote dry-delete-extraneous-on-remote tdir

# Plonk the following at the end of your Makefile
.DEFAULT_GOAL := help

# Inspired by <http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html>
# sed script explained:
# /^##/:
# 	* save line in hold space
# 	* purge line
# 	* Loop:
# 		* append newline + line to hold space
# 		* go to next line
# 		* if line starts with doc comment, strip comment character off and loop
# 	* remove target prerequisites
# 	* append hold space (+ newline) to line
# 	* replace newline plus comments by `---`
# 	* print line
# Separate expressions are necessary because labels cannot be delimited by
# semicolon; see <http://stackoverflow.com/a/11799865/1968>
.PHONY: help
help:
	@echo "$$(tput bold)Usage:"
	@echo "  $$(tput sgr0)make $$(tput setaf 6)<target>$$(tput sgr0)\n"
	@echo "$$(tput bold)Available targets:$$(tput sgr0)";sed -ne"/^## /{h;s/.*//;:d" -e"H;n;s/^## //;td" -e"s/:.*//;G;s/\\n## /---/;s/\\n/ /g;p;}" ${MAKEFILE_LIST}|LC_ALL='C' sort -f|awk -F --- -v n=$$(tput cols)-2 -v i=19 -v a="$$(tput setaf 6)" -v z="$$(tput sgr0)" '{printf"  %s%*s%s ",a,-i,$$1,z;m=split($$2,w," ");l=n-i;for(j=1;j<=m;j++){l-=length(w[j])+1;if(l<= 0){l=n-i-length(w[j])-1;printf"\n  %*s ",-i," ";}printf"%s ",w[j];}printf"\n";}'|more $(shell test $(shell uname) == Darwin && echo '-Xr')
