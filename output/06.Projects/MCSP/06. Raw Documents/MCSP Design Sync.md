# MCSP Design Sync

**Recording:** MCSP Design Sync-20260619_104244-Meeting Recording
**Date:** June 19, 2026, 3:42PM
**Duration:** 27m 46s
**Participants:** Benjamin Howard, TJ Koines

---

## Raw Transcript

Benjamin Howard started transcription

**TJ Koines** 0:08
Right, I'm back. So just for a quick, yeah, like overview of.

**Benjamin Howard** 0:10
Okay, can you?Can you?Can you just, can you repeat what you just talked about with the production ingress, the egress? I think I wrote it down, but just want to make sure it's like clear from your words.

**TJ Koines** 0:17
Yeah.Yeah.Sure.Okay, so...For production instance, and kind of the two sides of this that I'm thinking is there's like production versus like testing. For production, what that basically means is the cluster's public address is turned off, so it can't be accessed from the public internet. The only connectivity to the cluster is through private networking, which is done through...

**Benjamin Howard** 0:36
Mm.

**TJ Koines** 0:51
The AWS PrivateLink ingress connection, which allows like applications and services to ping Vault and request credentials back from Vault. And then the egress connection, which allows Vault to reach out to your AWS account and say if there's like a database in there.that you're generating dynamic credentials for, it can like reach into that database and generate the credentials for you, or it can reach into like another resource and rotate the credentials, like auto rotating secrets, stuff like that.

**Benjamin Howard** 1:25
Perfect.

**TJ Koines** 1:25
So basically like ingress is stuff requesting stuff from vault. Egress is vault reaching out into your private resources and like doing stuff to them on its own volition.

**Benjamin Howard** 1:34
OK.Nice. Thank you.

**TJ Koines** 1:37
Yeah.Okay, so overview page like so.Some of this is placeholder here right now. Documentation will have probably like CLI guide and API guide, but like whether these are all broken out differently or maybe there's some overlap between them is kind of TBD, so it's something you'll probably have to keep an eye on. And then I included the share feedback.Um...which we call card here, which I'm hoping we can fill in. Like there isn't a survey for that yet. So again, that's something that you can think through at some point for GA and include a survey in there with whatever kind of stuff we'd want to start learning from customers. And if you want, there is some prior art for like previous versions of Vault.

**Benjamin Howard** 2:22
Mm-hmm.

**TJ Koines** 2:27
for what we've had that I might be able to dig up, but yeah, TB.Okay, so again, this is when you first sign in. You have not created a private link, so we're prompting them to do that first because you need to do that to access your vault cluster. Once you have set up private link, then that goes away. The layout changes a little bit. This cluster details card gets stretched out.But at the top of the page is this cluster access tile. And it has two things on it. Opening cluster is what's actually going to open up like the vault itself, like the space where you're managing secrets and like basically vault core in like its own window.And then locking vault just locks all the APIs. So in the case of like, we think there's like a bad actor that got into our system, you like lock vault and then no secrets can be read from the cluster until you think you've like established security again.

**Benjamin Howard** 3:31
Okay.

**TJ Koines** 3:33
Well, it has a private IP address. It's right there.Okay, and then this is...What I'm calling the trial instance here, this is basically just the opposite of production, which is like if we think that...are in the onboarding flow that they're going to be using this cluster for testing, which like they can select trial in the onboarding flow. So it's like we know they're trying to do a trial, then we enable the public IP address, which means the cluster can be accessed from the public internet, which means.Again, Vault can reach out to different systems and do stuff, or you can read secrets from Vault without having to set up any of the private network connectivity, which is...a hassle, we'll say the least. So it's just like, it's not secure. So like customers wouldn't do this in production, but it's just like a much faster way to like be able to test out vault without.having to set up all that other stuff.

**Benjamin Howard** 4:37
There was, I think Sarah and I had discussed this. She had originally proposed an idea, and I gave a counter idea, and I think it's to do with this private link, but it's essentially spinning up a duplicate cluster in order for them to test out. She said that's a lot of work on the engineering, but that's something that could possibly be done, is spinning up a duplicate cluster.cluster so then I would be able to have like a test environment and my actual environment sort of how like you have a GitHub branches. And then they would be able to make the changes within here and then they would be able to merge those changes within which he said like.

**TJ Koines** 5:12
Ohh yeah.

**Benjamin Howard** 5:21
it would be a lot on the front end, but she was like, I think that that's a great idea and it's something that I'm probably going to run with. Yeah.

**TJ Koines** 5:26
Yeah.Yeah, that's interesting.Yeah.I, yeah.

**Benjamin Howard** 5:34
Because if like we're already doing one, we might as well just do 2 and make that a test environment.

**TJ Koines** 5:40
Yeah, it's a cool idea. Because again, as you said, like they could do stuff in the test environment and then have...

**Benjamin Howard** 5:40
So.

**TJ Koines** 5:46
you know, public connectivity to it and be like way easier to test back and forth and yeah, while keeping their other clusters secure. It's a cool idea.

**Benjamin Howard** 5:51
Exactly.Mhm.

**TJ Koines** 5:57
Ohh.Okay.Over here, I just had, like, this is what happens if you hit lock. It gives you a confirmation. Hit lock. There's an unlock.Oh, so it's like you hit lock, little banner on the top of the page that says it's locked and you have to unlock and then you hit unlock and it unlocks. Pretty straightforward.

**Benjamin Howard** 6:26
Do we have, do we have?

**TJ Koines** 6:26
Ah.

**Benjamin Howard** 6:31
information about what each, what the functionality of what each does. So if I'm in, I know you explained basically there's no secret flow when it's locked, but what else am I, is there anything else that I'm restricted in doing if it's locked?

**TJ Koines** 6:43
Mhm.I don't think so, no. I think it basically just shuts off the API that allows reading secrets.

**Benjamin Howard** 6:57
Okay.

**TJ Koines** 6:58
But...could be worth looking into a little more. I don't know.

**Benjamin Howard** 7:02
Okay, perfect. Thank you.

**TJ Koines** 7:05
Yeah.So this is the second item of the nav, which is basically the ability to stream logs and metrics. So the way this works is you hit enable streaming.We only allow streaming to CloudWatch, at least for now. I think in the commercial release, we'll have way more options, but for FedRAMP, it's only CloudWatch. So they're just going to put in some details about their CloudWatch account and choose if they want to be streaming audit logs or metrics to CloudWatch.I tried at one point to make it so you could do both, but I think...For some reason, we have to do them separately. So you have to basically set up streaming with CloudWatch twice for two of these. But basically, again, it's just going to like, it's going to stream like.

**Benjamin Howard** 7:53
I just want to say, yeah.

**TJ Koines** 7:57
all that information to your CloudWatch account where you're going to go and like sift through it and do monitoring and stuff like that.

**Benjamin Howard** 8:04
Okay.

**TJ Koines** 8:06
And then this would be the completed, well, it's like establishing connection, and then the completed state just says it's active or not.And.Yeah, a little toast notification.

**Benjamin Howard** 8:20
With that view of the monitor.

**TJ Koines** 8:24
Yeah.

**Benjamin Howard** 8:25
Being that you said you would have to set up two different cloud watches in order to view the audit logs or the metrics, is that correct? Could we do two of those cards and then that way it specifies which one is which?

**TJ Koines** 8:33
Yeah.Yeah, that's a...Yeah.I think I had done this when they were, I thought they could be together, but yeah, maybe this should be updated.

**Benjamin Howard** 8:46
Possibly together.

**TJ Koines** 8:51
So, I'll just make a note to...Yeah.

**Benjamin Howard** 9:01
And then I would assume.That there needs to be.So if I'm looking at this monitor, what can I do with this? Can it take me to CloudWatch? Can we include a link in order to do an external link out to that? And then it would take me directly to those audit logs or the metrics?Basically, given these cards access, or are we able to do an API call from CloudWatch in order to...

**TJ Koines** 9:27
That's a good question.

**Benjamin Howard** 9:36
have that information within this system here. So we can't do the API call. So yeah, so maybe taking an external link.

**TJ Koines** 9:43
No, yeah.Yeah, I think that might be the only thing you could do. That could be worth looking into.

**Benjamin Howard** 9:48
Okay.

**TJ Koines** 9:56
So we have metrics there. Okay, so now the juicy bit ingress.Um...So again, what Ingress does is you're giving users, applications, agents, whatever, access to your vault cluster to read secrets or other kinds of credentials. You would hit allow access.The first step here is you're adding your AWS account as an allowed principal.So in this case, what you're going to be putting in is you're going to name your AWS account, just like something you're going to recognize. You're going to put in the principal ID, and you hit allow access.It will then be added into your allowed principles list, which means that we're going to accept connection requests from that AWS account from the Vault cluster. And then you have to go to your AWS account. You're going to take Vault's endpoint service name,possibly Vault's private DNS name if you want to, and you're going to follow these steps to create a private link connection from your AWS account. Again, just using some details about your Vault cluster.So you're going to do that in AWS.And you're gonna...Um...Request access to the Vault cluster and then Vault's going to automatically accept it. So like when it does accept, it should automatically connect.I'm not sure we need this pending state anymore, actually.

**Benjamin Howard** 11:41
And then...because it's going to connect automatically.

**TJ Koines** 11:45
But.Yeah.

**Benjamin Howard** 11:48
Yeah.

**TJ Koines** 11:49
Well, again, it's a rabbit hole that will...

**Benjamin Howard** 11:49
Um...So with the allowed principles, I'm going to be able to see it essentially like this in this table form. And then that would list the AWS information that we provided to the far left.

**TJ Koines** 12:05
Yeah.

**Benjamin Howard** 12:06
Oh, yep, I already had boom.

**TJ Koines** 12:07
Yeah, so this is the allowed principles. It just shows, again, the stuff you just put in really. And this is just like, again, a list that we will accept connection requests from.

**Benjamin Howard** 12:13
Mhm.Okay, is there any double tap information, anything that's secondary that can be viewed from here? So it's just that name, just the principal, but there's no information like statuses that we can see other than that. Could we put potentially do like active and inactive? So if like we had allowed principals,What if there was a previous ones that we deleted from there? Is it possible to do another tab on that like inactive or have a filtering where we can do inactive?

**TJ Koines** 12:53
Yeah, you probably could.

**Benjamin Howard** 12:55
Okay.

**TJ Koines** 12:56
Um...Yeah, if you want to see like past principles allowed, you could add that.

**Benjamin Howard** 13:01
Yeah.

**TJ Koines** 13:06
Oh.What's we got?So that's kind of an overview. If you want to add another endpoint after there's one created, you hit add endpoint, and then you see that same information that was on the empty state, just in a modal.

**Benjamin Howard** 13:20
Mhm.

**TJ Koines** 13:24
Otherwise, I think this is all just like crud stuff, so we don't need to go into too much detail right now.Um...Yeah, I think that's fine.

**Benjamin Howard** 13:35
Okay.

**TJ Koines** 13:36
OK.For egress. So again, this is connectivity going the other way. So it's like letting Vault reach out into your private AWS account and like do stuff to resources there. So you just hit create egress.

**Benjamin Howard** 13:51
Mhm.

**TJ Koines** 13:56
You're doing the process basically in reverse now, so...You need to go and allow vault as allowed principal in your account.And then you're going to give us, you're going to name the connection for Vault. You're going to give us the endpoint service name that's in your AWS account. You'll put in a port. And then if you want, I think.

**Benjamin Howard** 14:25
Is it?

**TJ Koines** 14:26
This is like a setting basically in AWS that you're choosing.

**Benjamin Howard** 14:29
So with the connection name, does that connection name have to be different from that from the ingress connection name?

**TJ Koines** 14:38
It doesn't have to be. So the I just put in connection name like specifically to like organize things on our end. So it's like people can have some kind of labels for these connections other than just like either the endpoint service name or the.like AWS account.

**Benjamin Howard** 14:58
Being dead.The ingress and the so if we set up the connection names, is it possible for for connection name?an endpoint name. So first, first connection name, can we do a drop down where they can select that connection name that's associated with that particular ingress that they selected?And then, so it has to be something different.

**TJ Koines** 15:24
Yeah, again, the connection name is just completely like made up on our end. It's just for organizational purposes. And they're not associated like one to the other. So it's like ingress is like completely its own thing and then egress connections are its own thing.

**Benjamin Howard** 15:28
Yeah.That's what I was thinking.Okay, yeah, that's what I was thinking. It's like, it basically acted as like a tether with like A and then B, and then if I have an ingress point right here where this information is coming in, it would have to flow within this line and then egress out of that. But you could say, but technically speaking, I can have one ingress point.

**TJ Koines** 15:40
Yeah.

**Benjamin Howard** 15:57
And I can have multiple egress points.

**TJ Koines** 16:00
Yes.

**Benjamin Howard** 16:01
Okay.

**TJ Koines** 16:01
So like, yeah, ingress is basically for each AWS account that has resources that you want to access vault. You're going to do like a different one for that. And then egress is like a little.more up to preference, I think, where it's like you could do that, where it's like have one egress connection for an AWS account, or you could be more granular and you could be like, this egress connection is just for like this database or just kind of like up to their own network policy.

**Benjamin Howard** 16:28
Yet.Okay, and then do we have any way of automatically being that they connected the AWS account? Do we have a way in order to auto generate the endpoint service name?Or that's once again something we have to name.

**TJ Koines** 16:45
Uhh.So the endpoint service name is actually a resource that they're creating in their AWS account and then sharing it with us. It's like they're creating an endpoint service and then giving us the name of that resource so that we can ping it.

**Benjamin Howard** 16:57
Okay, so they're going to have to pull that.Okay.Okay, so we, so there's no way for us to get that automatically. That's something that they're going to have to just pull from AWS.

**TJ Koines** 17:10
Yeah.In earlier designs, I had like a Terraform snippet that would help them create the endpoint service, but the dev team was pretty adamant that we shouldn't be trying to like create stuff in customer accounts, just because there's like a lot of config details and just like policy choices on their end that we don't want to like.

**Benjamin Howard** 17:25
Okay.

**TJ Koines** 17:32
you know, presume too much about.

**Benjamin Howard** 17:34
Yeah, okay, that makes sense. Thank you.

**TJ Koines** 17:37
Yeah.Um...And then, so they've created their egress connection. Depending on their AWS account policies, that connection can be set to like auto accept the way that it worked in the egress connection flow, or they could have like a manual step where it's like.every connection is required to be manually accepted. And if there's that manual step, then we're going to have like a state like this that we can tell that the exception needs to be, the connection needs to be accepted. So we can have this little thing that says, hey, go accept the connection. How do I accept it?And we can give them directions, which again, they're going to have to go and do in their AWS account. But once they've accepted it, then again, it's going to show green and it's going to be working.

**Benjamin Howard** 18:23
OK.

**TJ Koines** 18:30
Um...Yeah, the only thing I'll say is, again, if you want to create another one, you'll hit create egress, and then that same tear sheet comes up.I think that's the gist of it.OK, that's egress.

**Benjamin Howard** 18:50
Yeah.

**TJ Koines** 18:50
Settings, we don't have very much for right now.The 2 we have are whether or not there is a public IP address, which we had talked about before, but I think this might actually have been taken out of scope, I forget. So we might just not even offer public IP addresses at this point.

**Benjamin Howard** 19:09
Okay.

**TJ Koines** 19:10
But if it is there, then you hit edit, you get a little modal, make a selection, and that's how you choose. And then snapshot cadence. I think this was like a stretch goal for GA, which I kind of also doubt they're going to get to. So it's like it's possible we don't even have a settings page, but kind of similarly.they can choose how often snapshots are taken of their vault cluster, which is basically like just a snapshot of all the data and like all the config stuff. So it's like if something terrible happens to their vault cluster, they can restore it from that snapshot.So we hit save and then that's done.Speaking of snapshots, that's the last page, which is just a table that shows all the snapshots that are taken automatically. They can manually create a snapshot if they want. They can restore old snapshots.Um...Yeah, it's kind of the gist of it.Up.Yeah, we're already a tiny bit over time. So if you don't have more questions about this, I can give you kind of like a brief overview of what has been going on with the private link stuff.

**Benjamin Howard** 20:23
Yeah, no, no, this has been perfect. And then what I'll do is I'll digest that information and then just ping you with questions, but then we can go over the private link stuff now. Yeah.

**TJ Koines** 20:29
Yeah, absolutely. Okay.So.with private link.The decision was made somewhat recently that mostly just...for faster development. The idea was that...Um...All of the different vault customers, or all the different vault clusters for different customers, are going to share one.Ah.Vault endpoint service, so it's like there's this one endpoint that like.all of the different like customer private networks would connect to. And then from that endpoint, traffic would be diverted to the right like vault cluster within our account. Does that kind of make sense? So we have just like a shared endpoint service model.

**Benjamin Howard** 21:27
Mm.Yes.

**TJ Koines** 21:36
There was discussions yesterday around how that can actually lead to really odd situations where it's like, because there's only one endpoint service and it's all managed from the same AWS account, thenWhere did that this?Where did the allowed principles go?Like all the allowed principles are kind of aggregated in one list in our AWS account, which leads to odd situations where it's like if a customer has two clusters and they add the same allowed principle to both clusters, then it's like they're both adding the same item to the same list.So if one cluster deletes it, then it like, we won't actually delete it because the other cluster is using it, which means that in that the cluster that deleted it, because the allowed principal is still on the list, then a connection could still be made to that cluster that will be automatically accepted even if they deleted it.

**Benjamin Howard** 22:30
Yeah.

**TJ Koines** 22:43
It's like kind of an edge case, but like really unintuitive and not very secure behavior.So that's kind of like the crux of the problem.

**Benjamin Howard** 22:56
Yeah, that makes.

**TJ Koines** 22:56
Before, yeah.

**Benjamin Howard** 22:58
That makes sense.

**TJ Koines** 23:00
Okay.

**Benjamin Howard** 23:01
So what is it? So now, ultimately, the solution is to divide those, or excuse me, to separate those, correct?

**TJ Koines** 23:08
Right.Yeah, so we're gonna, well, that's.So there's two possible solutions right now. One is that like...The messy one that we'd that would only be done for the sake of time would be that, like when you delete a principle like this.If we know that it's used by another cluster, we're going to have a warning that's like, hey, you're deleting it, but it's not really deleted because your other cluster is using this. So that would be like the short-term solution. And then as you're saying, the long-term solution would be just to give every cluster its own endpoint service.Um...But that would involve more like configuration on the customer creation end and probably more like manual steps in accepting connections. So it's like this, like ingress workflow in particular would probably change.

**Benjamin Howard** 24:07
Could this be a possibility? So when it presents that warning and it says, hey, this is going to be deleted, but not really because it's connected to this other one, is there a way on the back end potentially for us to select which one you would like it to be deleted from? So you go and delete it and then you'd be able to do it.and it reads like...It would read to just delete it from there.

**TJ Koines** 24:32
No, because.

**Benjamin Howard** 24:34
Yeah.

**TJ Koines** 24:36
This allowed principles list basically exists in AWS.And it's like either the principal is on the list or it's not. So it's like if it's if it's on for one cluster, it's on for all the clusters. So it's like it's a shared list. So like technically even like cross customers could like add principals, but it's like it only really matters if like.

**Benjamin Howard** 24:48
Gotcha.Yeah.

**TJ Koines** 25:02
The account itself is also like given access, so...

**Benjamin Howard** 25:06
Yeah, okay, that makes sense.So right now, the solution is the messy solution that you said, or is there a desire to try to push for the cleaner version?

**TJ Koines** 25:17
Um...So what was happening after the meeting yesterday was that Sean was going to talk to Harini's team, which is the team that works on this private link stuff, and kind of give them the option of like, do you guys think you could do the like, you know, unique?endpoint per cluster solution before GA or is that like too much of an ask? Should we go to GA with the shared model and then do this as like a fast follow? So like I think in either case like.

**Benjamin Howard** 25:53
Yeah.

**TJ Koines** 25:56
It'd be on you to kind of design the new solution, but it just depends. Like, is that like very short term or is that like something that would be delivered after GA?

**Benjamin Howard** 26:05
Okay. And is there points of contacts that you best recommend that I speak with to like obtain more information about that?

**TJ Koines** 26:14
Yeah.So the people that were in the meeting yesterday, I think most of them you already know. There's like Sara and Sean and Manish.Um, and then Harini's - have you met Harini yet?

**Benjamin Howard** 26:31
No.

**TJ Koines** 26:32
Okay, I'll send you her name. She's a manager in India, and then it's one of her teams, I think, that does a lot of the private link work. So there's like Harini, who's the manager, and Shivali, who I think is the team lead. And especially if the redesign happens.then they're the ones that you're probably going to be working most closely with. And I can, I'll send you both of their names.

**Benjamin Howard** 26:59
Okay, perfect. Thank you.Yeah, no, this has been, yeah, this has been really good. I know we're way over jumping to the other meeting, but what I'll do is take this information digested, looking around, and then the questions that I have, I'll just ping you offline. Like I said, I'm taking off after this next meeting, yours as well. So

**TJ Koines** 27:03
Right.Yeah, sure.Ace.Yeah.

**Benjamin Howard** 27:23
Monday, we can just get back after it.

**TJ Koines** 27:25
Alright, yeah, that sounds good. Again, yeah, enjoy your weekend. I'm happy to meet up again, or you know, whatever, whenever's helpful.

**Benjamin Howard** 27:32
Also, TJ, you have been so helpful. I really appreciate you taking the time.

**TJ Koines** 27:35
Yeah, I'm glad to be handing this off to you. Good luck. Yeah. All right, man. Have a good one. Bye.

**Benjamin Howard** 27:39
Yeah, I feel like, like, give me away. Love it. Alright, take care. Bye.
