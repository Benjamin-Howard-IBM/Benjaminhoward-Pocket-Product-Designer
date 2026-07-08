# MCSP Audit Logging Discussion

**Type:** Video transcript
**Speakers:** Manish Tomar, Benjamin Howard, Divya Pola, Erika Pierre

---

## Summary

Manish walks the team through the audit logging design for MCSP Vault on FedRAMP: per-cluster S3 bucket isolation, the customer role-ARN enable/disable flow, the four supporting APIs, and the distinction that audit logging is always on while only access is toggled. The session closes with work distribution across backend, API, and design.

---

## Transcript

### Bucket and storage design

**Manish Tomar (0:15)**
OK, so as I mentioned, the way we are going to do this - let me share my screen. So we're going to be having each cluster get its own bucket. We'll probably name it like this: instance followed by the ID, and then snapshots. It'll get two buckets basically: instance ID audit logs and instance ID snapshots. So as you can see, for the particular cluster, logs are going to go in one bucket and snapshots are going to go into the other bucket.

The reasons I have described here, you are welcome to read. It basically gives out maximum isolation, which helps in getting federal compliance. We could store it in one bucket, but because we are giving direct access to the S3 bucket, it's probably better to have a separate bucket per cluster. So we're going to be doing that.

**Manish Tomar (1:33)**
Here's the important bit for user experience. The process that's going to be followed: we have some screen where the user can configure audit logging - I'm just assuming this is the same screen.

_[Gap in transcript: 1:42 - 7:46]_

### Enable / disable flow

**Manish Tomar (7:49)**
There should be some button somewhere saying "enable access, provide the role ARN," and then they can enter that.

**Benjamin Howard (7:53)**
Yep. Yeah, perfect, thank you.

**Manish Tomar (7:58)**
Once they click enable and provide the role ARN, the screen will change to say access is enabled. There will be some extra pieces of information: our role name, the customer's role name, the external ID, and probably instructions on how to access the S3 bucket, like a sample AWS CLI command that they can use to access the S3 bucket.

**Benjamin Howard (8:22)**
Yep, perfect.

**Manish Tomar (8:23)**
That's pretty much it from the UI/user experience. Once the customer's role setup is done, they should be able to use their role chaining to access the AWS API and the S3 bucket.

### Debuggability

**Manish Tomar (8:57)**
In terms of debuggability of the system - if things are not working, that's something you'll have to think about. If the system can help in any way to check whether it's all set up properly. The best the system can do is what I put here: instructions or sample commands to assume the role.

**Manish Tomar (10:01)**
Ideally there will be sample AWS commands that they can just copy-paste, put in their shell, run, and see if their access to get the bucket is working. If it is not working, I think the best thing is for them to reach out through support. There's nothing much we can do beyond that.

What we could do is: once they access it and it is working, we can say "this is the last time the role was assumed." That's the best we can detect from our side. But if they have not set up the roles properly, aren't assuming well, or their shell is broken, there's nothing much we can do beyond that.

**Manish Tomar (10:43)**
This is a "to be done" or nice-to-have. I'm keeping it as a future thing - assume it's not going to be there now, but maybe something to add if customers ask or if product or design thinks it's important.

### The four APIs

**Manish Tomar (11:07)**
So that's pretty much the user experience. To power this experience on the UI, there's going to be four APIs.

1. **Get audit logging access** - powers the screen when you go there. It gives four pieces of information: whether it is enabled, the role in our system that the user has to assume, the customer role, and the external ID. The instructions are static and can just live on the page - nothing needs to come from the API. If access is disabled, it'll just say `enabled: false` along with our role that the user has to assume and the external ID.

2. **Enable audit logging access** - when they enable access, they provide their role. Once we enable it, we return the same pieces of information.

3. **Disable access** - once access is enabled they can keep using it, but they can also disable access. Once they disable, we remove access to their role, and the disabled state comes back.

### Disable confirmation modal

**Benjamin Howard (12:47)**
And do we have the consequences of that action? If we're putting that within the UI where they're seeing that information and we have a button that says "disable access," there should be a modal that pops up and provides the information of what that state means. Is that information within this document here?

**Manish Tomar (13:18)**
I didn't follow. Can you repeat the question?

**Benjamin Howard (13:20)**
Yeah, so if they disable the access - the same way they can enable it - I would imagine on that screen showing their AWS role ARN and the four key pieces of information, there should be an option to disable access on that same page. Once they press that disable button, there should be a modal that pops up to confirm the action. What copy should be in that modal to explain the consequence of the action they're about to take? Like bullet points saying "if you do this, it does A, B, C..."

**Manish Tomar (14:10)**
I think the only piece of information that needs to be displayed is that after disabling access, the customer-provided role is no longer provided access. So let's say they named their role "log reader" - that's the role they provided to us - we can explicitly say "role *** log reader will not be able to access logs anymore." Then: "Are you sure you want to continue?" Yes, and then it goes away.

**Benjamin Howard (14:56)**
Okay, perfect.

### Key caveat: logging is always on, only access toggles

**Manish Tomar (14:57)**
One important caveat of the experience: audit logging is never disabled. It's just the access to it that is enabled or disabled. That terminology has to be clear so users don't think their audit logs are lost - that's not the case. They're always stored. It's just about enabling access to them.

So they can provision a cluster today, enable access two days later, and get all the data that has happened in the last two days. A week later they disable access, and a week after that they enable it again - they will still be able to see everything that has happened from the beginning of the cluster.

**Benjamin Howard (15:54)**
Okay, that makes sense. So that's what the modal should essentially say when they're disabling access - it'll tell them that if they do this, it'll disable access, and if they re-enable it a couple of days later they'll be able to see it again.

### Where logs are viewed (AWS, not our UI)

**Benjamin Howard (16:16)**
What I envision is being able to link out to view that information from that page as well, so they could go and see the audit logs. Is that something we have access to in the system?

**Manish Tomar (16:35)**
Link out to which page?

**Benjamin Howard (16:36)**
To see the audit logs.

**Manish Tomar (16:39)**
No, they can't - this screen is the way they get access. There's nothing to link to. We are leaving it within AWS. We are not building any experience to show the audit logs. That's all directly within AWS - we leave it to the customer and AWS. AWS is the experience where they get the audit log access from.

**Benjamin Howard (16:51)**
Got you, okay.

**Manish Tomar (17:07)**
Yeah, our experience is just enabling access directly to the S3 bucket. From then on, how they read the logs and how they fetch them is entirely inside the AWS world, outside our system.

**Benjamin Howard (17:21)**
Okay.

### Work distribution

**Manish Tomar (17:27)**
Divya, Erika - questions?

**Erika Pierre (17:42)**
Would you mind sharing a link to this document so that I can follow along? Thank you.

**Manish Tomar (17:45)**
Yeah, sure. In terms of implementation - Divya, are you there? Just to clarify.

**Divya Pola (18:15)**
Hey, can you hear me?

**Manish Tomar (18:17)**
Yeah, I can hear you now.

**Divya Pola (18:18)**
Okay, maybe my AirPods aren't working. I'm good with the UX stuff we've been through so far. Implementation-wise, I still need to catch up. I read the RFC and have a basic idea of what needs to be done, but I probably need to chat more with you on how we distribute the work and how to get started.

**Manish Tomar (18:41)**
Yeah. On a broad scale, I see two parallel streams of work on the backend side, and apart from that the front end and design can happen in parallel - so about three streams of work total. Benjamin can start designing the work, probably discuss with Erika, and ask me any questions.

On the backend side, the two broad streams are: all the API implementations, and enabling the S3 bucket provisioning and sending all the logs to S3. So I was thinking, Divya, you can take care of the API implementation - all the management APIs - and I can take care of storing it in S3.

**Divya Pola (19:33)**
OK, sounds good.

**Manish Tomar (19:35)**
Continue reading the RFC and let me know. To implement the APIs, I think it's going to be completely powered by AWS - there's no state anywhere else. It's just pulling things from AWS policy, tweaking it, and giving it out that way. So it's not that complicated.

**Divya Pola (19:58)**
Got it. Yeah, I'll start with that.

_[Gap in transcript: 20:19 - 22:08]_

**Manish Tomar (22:08)**
Yeah, sure.

**Benjamin Howard (22:09)**
Great, thank you.

**Manish Tomar (22:18)**
Design and then the page - I'll probably give this to Erika. And then I'll work separately with Divya on all the other back end stuff and how to distribute the work. Cool. If there are no more questions...

**Benjamin Howard (22:52)**
Alright, thank you. Bye, everyone.

**Manish Tomar (22:54)**
Thank you. Goodbye.

**Divya Pola (22:56)**
Thank you.

_[Manish Tomar stopped transcription]_

---

## Decisions

- Each cluster gets **two dedicated S3 buckets** (one for audit logs, one for snapshots) for maximum isolation and FedRAMP compliance, rather than a shared bucket.
- Customers **enable access** by creating an IAM role in their own AWS account (with a provided trust policy) and passing the **role ARN** to us; the backend updates the role's trust policy to allow only that customer role to assume the Vault role.
- The enabled screen shows: our role name, the customer role name, the external ID, and sample AWS CLI/S3 commands.
- **Disable** removes access for the customer-provided role; a confirmation modal must state that the named role will no longer be able to access logs.
- **Audit logging is always on** - only access is enabled/disabled. Logs are retained from cluster creation regardless of access state.
- Log viewing/fetching happens **entirely within AWS**; we build no log-viewing UI and no link-out to view logs.
- "Last time the role was assumed" is a possible future/nice-to-have debuggability signal, not in initial scope.

## Action items

- **Divya Pola** - API implementation (all management APIs), AWS-policy-driven, no external state.
- **Manish Tomar** - S3 storage: bucket provisioning and sending logs to S3.
- **Benjamin Howard** - design work; coordinate with Erika.
- **Erika Pierre** - design/page ownership; Manish to share the document link.
