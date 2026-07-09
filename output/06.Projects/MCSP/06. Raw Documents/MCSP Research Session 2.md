# MCSP Research Session 2

**Type:** Video transcript (user research session)  
**Speakers:** Benjamin Howard, Luke Mccleary

---

## Transcript

**Benjamin Howard (0:03)**  
Site. But. Yeah. All right, should be recording now. If you want, pop back on. Okay.

**Luke Mccleary (0:20)**  
Cool. Yeah.

**Benjamin Howard (0:26)**  
It's the moment. Nicer. Come on and pull up. There we go. All right, so we'll start just with some like easy opening questions for you. So in a sentence, what's your role and have you worked with like the, how have we worked with the ball federal accounts?

**Luke Mccleary (0:59)**  
Yeah. I am a solutions engineer. I work with the Department of Homeland Security and the FAA and the Department of Justice. The biggest accounts I have are the FAA and probably a couple of the Homeland

**Benjamin Howard (1:13)**  
SEKAR.

**Luke Mccleary (1:16)**  
Security accounts. I do have the largest, I think, renewal base in the federal business,

**Benjamin Howard (1:22)**  
She likes.

**Luke Mccleary (1:24)**  
and I work with the longest tenured federal rep. So we've got roughly $6 million of ARR, I think,

**Benjamin Howard (1:30)**  
Second.

**Luke Mccleary (1:32)**  
that we support throughout the business. So we got a lot of contracts.

**Benjamin Howard (1:33)**  
Exactly. So.

**Luke Mccleary (1:38)**  
I mean, I see, so my job is to support my existing

**Benjamin Howard (1:41)**  
And all of that setting, that is an engaged individual

**Luke Mccleary (1:42)**  
business and support my customers through acquiring a new business and expanding

**Benjamin Howard (1:45)**  
organization, and computing for almost a time.

**Luke Mccleary (1:49)**  
their business.

**Benjamin Howard (1:51)**  
And now, over roughly the last year, you said you've worked with the FAA

**Luke Mccleary (1:52)**  
So.

**Benjamin Howard (1:56)**  
directly. Is there any other DOD or civilian

**Luke Mccleary (1:59)**  
Yeah.

**Benjamin Howard (2:00)**  
agencies, intelligence communities that you've worked with or have worked with second hand?

**Luke Mccleary (2:09)**  
I really, we really kind of stick to our territories. Historically, I've worked with the Department of Energy. It's not my account set anymore. I know it pretty well because I had it

**Benjamin Howard (2:18)**  
It's in the one density right now, which is and for the accounts that you

**Luke Mccleary (2:19)**  
for years. But other than that, the current account set that I have is what I know best.

**Benjamin Howard (2:26)**  
that you'll be talking about today, were you hands-on in that deployment or were you just assisting? Assisting them with that deployment.

**Luke Mccleary (2:41)**  
No hands-on. We don't really do hands-on in our role.

**Benjamin Howard (2:45)**  
Okay.

**Luke Mccleary (2:45)**  
We're advisory. We lean heavily on professional services to make sure that they get where they need to be. So while I have a lot of design knowledge of where they ended up,

**Benjamin Howard (2:56)**  
So.

**Luke Mccleary (2:57)**  
I did not do the design work for the most part myself.

**Benjamin Howard (3:00)**  
Yes.

**Luke Mccleary (3:01)**  
some recommendations, but yeah, that's where we land.

**Benjamin Howard (3:01)**  
So much. And now, of the customers that you're working with, just go ahead and pick one of those at Federal Fault like deployments that you know really well. And roughly how many humans users actually are logging in? Is it daily, active, total?

**Luke Mccleary (3:31)**  
So this is gonna change, I think. dramatically with the shift in licensing. So the move from application-based

**Benjamin Howard (3:38)**  
Hello.

**Luke Mccleary (3:39)**  
licensing to secret-based licensing will open up the platform to a lot more human identities since we're not penalizing our customer for consuming those identities by logging in. So the answer I give now is going to be a much lower answer than I suspect we will land in a year or two from now, Especially the deals I'm working on right now, we're basically just sizing for every application owner to have an identity, be able to log in, manage secrets for their applications. And historically, customers have done the complete opposite. They've architected and designed the platform to minimize the number of people that log in. So keep that in mind as an answer here. So for my customers, even the biggest agencies have less than probably 100 people logging in.

**Benjamin Howard (4:29)**  
Interesting. Now, separately, roughly how many machines, applications, services, or workloads authenticate to the same vault? And Is it low? Is it is it high, and where does that land? OK, you want to see also, like, if you could tell us that.

**Luke Mccleary (4:45)**  
Much higher. So CIS has 3000 clients. I don't have the stats in front of me of

**Benjamin Howard (4:51)**  
Cycle.

**Luke Mccleary (4:53)**  
how many hits they get per day, but there's several 1000 application pods

**Benjamin Howard (4:57)**  
Bye.

**Luke Mccleary (5:00)**  
that are hitting that thing. That's just That's one account, that's the biggest single vault account that I have, but that is subject again, that's gonna probably change in the next

**Benjamin Howard (5:09)**  
Mhm.

**Luke Mccleary (5:14)**  
12 months with a couple of the accounts that I have, so you know. The ratio that I typically see is something like for every one user,

**Benjamin Howard (5:20)**  
I'm sorry. Just happened.

**Luke Mccleary (5:24)**  
there's probably 10 to 20 applications, identities that are logging in. It's just five that are, you know.

**Benjamin Howard (5:30)**  
And now, in terms of secrets, how many secret entries live in a typical secrets engine, and how many name spaces does a large count typically carve out? Yeah, got it.

**Luke Mccleary (5:45)**  
Gonna vary wildly by maturity, age of the customer. That one's tough to heart, that one's difficult to scope.

**Benjamin Howard (5:54)**  
Sigma.

**Luke Mccleary (5:55)**  
And I don't have a lot of hard information on it. So I'm probably going to defer on it because I can't really give you much, but.

**Benjamin Howard (5:57)**  
Stop. Ethan.

**Luke Mccleary (6:01)**  
.. Yeah, yeah, probably just have to do further.

**Benjamin Howard (6:07)**  
So let's do a little clarification. When you talk about maturity, are you talking about the maturity of the organization or whole or maturity of their experience with Vault?

**Luke Mccleary (6:17)**  
Great question. That I just meant straight maturity with the product. Like if they've been a customer for eight

**Benjamin Howard (6:22)**  
Okay.

**Luke Mccleary (6:23)**  
years, they're just going to have a ton of sprawl that's occurred over time, and they're going to have a ton of

**Benjamin Howard (6:27)**  
Mhm.

**Luke Mccleary (6:30)**  
namespaces. And even as our product has matured,

**Benjamin Howard (6:30)**  
A different box.

**Luke Mccleary (6:32)**  
it's obviated the need to do certain things. So they have a lot of legacy practices that maybe necessitate more namespaces, all kinds of weird stuff. So, yeah. Yeah, it's just gonna, it's gonna really run the gamut.

**Benjamin Howard (6:49)**  
Now, how have you seen that change over time with the... your particular customers that you're working with. Have you seen that grow?

**Luke Mccleary (6:58)**  
Ahh.

**Benjamin Howard (6:59)**  
Have you seen that shrink?

**Luke Mccleary (7:03)**  
I think people use more main namespaces now than they did previously,

**Benjamin Howard (7:06)**  
Mhm.

**Luke Mccleary (7:08)**  
because there were legacy ACL restrictions that made it more difficult to create policy and manage policy across organizations,

**Benjamin Howard (7:14)**  
Then, it and most of the.

**Luke Mccleary (7:17)**  
and that was fixed several releases ago.

**Benjamin Howard (7:20)**  
Be doing this.

**Luke Mccleary (7:20)**  
But it meant that it was just really hard to manage granular namespaces. You just have to do like, it was just a mess from an ACL perspective. And it was also a mess from an

**Benjamin Howard (7:28)**  
S.

**Luke Mccleary (7:29)**  
authentication perspective, because the authentication engines had to live in the same namespace. Yeah.

**Benjamin Howard (7:37)**  
Yeah, that makes sense. And now for a busy federal account, what's the authentication rate at peak? That's requesting logins per second, is it per minute? And... Is that load steady or spiky? And if it is spiky, what typically contributes to that?

**Luke Mccleary (8:01)**  
It's absolutely spiky. It's going to be at periodic application

**Benjamin Howard (8:02)**  
Vanny.

**Luke Mccleary (8:06)**  
reset times, whether they have, like a lot of customers will have like a..

**Benjamin Howard (8:11)**  
S.

**Luke Mccleary (8:11)**  
. A rule where they'll just bounce all their Kubernetes pods every two weeks

**Benjamin Howard (8:15)**  
Yeah.

**Luke Mccleary (8:18)**  
just to do a rolling restart, and that's how they manage secrets as well, and they just get a new secret every two weeks, and it'll have like a 30-day time to live, and that way they don't have to worry about... processes that are triggering restarts because of new secrets and stuff. They manage the process internally by just making sure that the pods are fresh enough that they always have a valid secret so they can't die. So that's going to hit the system pretty hard at those intervals. It's never going to be like, it's not like.

**Benjamin Howard (8:51)**  
Two years.

**Luke Mccleary (8:52)**  
a standard organization full of like, it's not like the Windows log on,

**Benjamin Howard (8:56)**  
C.

**Luke Mccleary (8:56)**  
like mass traffic thing. People experience like 8 AM,

**Benjamin Howard (9:00)**  
I.

**Luke Mccleary (9:00)**  
everyone came in, log on. Nah, it's nothing like that. It's the application side for sure. And I would be willing to bet it's mostly a Kubernetes driven. spike.

**Benjamin Howard (9:13)**  
So, the Kubernetes issues are the amount of things that are being pushed, so that's contributed to the spikiness of it.

**Luke Mccleary (9:23)**  
Yeah.

**Benjamin Howard (9:23)**  
kind of an overall. And of the heavy features,

**Luke Mccleary (9:25)**  
Mhm, mhm.

**Benjamin Howard (9:29)**  
when you think of like PKI issuance, KMIP, dynamic database, cloud credentials, or SHH, which one drives the most requests? or load on the accounts that you're working on.

**Luke Mccleary (9:45)**  
Database by far.

**Benjamin Howard (9:47)**  
Database, OK, and why is that?

**Luke Mccleary (9:48)**  
Yeah. It's just the problem that causes the most pain for our customers right now. I think it could be overtaken with, if we do some right moves with PKI, you know, PKI could dominate that category in a couple of years. I think it probably will, just given The need for certificates, but right now the challenge with managing

**Benjamin Howard (10:12)**  
That's not much.

**Luke Mccleary (10:14)**  
database credentials is the biggest problem from just a rotational perspective. There are just so many accounts that have to be rotated for their applications that it's the top use case that we have with our customers. The thing we sell it on.

**Benjamin Howard (10:29)**  
OK. What do you think has contributed to that challenge of the rotation?

**Luke Mccleary (10:38)**  
I think it's the dominant service credential type that applications have. When an application has a service credential, it's probably, you know,

**Benjamin Howard (10:44)**  
Nothing. We got the.

**Luke Mccleary (10:48)**  
8 out of 10 times that service credential is for a database.

**Benjamin Howard (10:55)**  
Yes.

**Luke Mccleary (10:55)**  
And there's a lot of databases. And that's kind of it, right? That's...

**Benjamin Howard (10:57)**  
K.

**Luke Mccleary (11:00)**  
I think there's a lot of nuance to it.

**Benjamin Howard (11:03)**  
Yes. Okay, now we're going to go a little bit into satrix and scaling. And so when one of these clusters start to struggle under load, what runs out first and what, you know, essentially what is the thing that you watch out for or, you know, calls attention to and says, okay, This is the this is the thing that we need to fix.

**Luke Mccleary (11:29)**  
So I'll call this out first. I've never had a customer hit performance limits on their cluster, any of them, at any of their scales. I think part of that's because none of them use the transit engine. So whatever customer asks me if they're able, if like, what are the performance limitations? What should I be looking out for? I'm like, are you going to use the transit engine? And they say, no, I'm like, then you're never going to see a performance limit on this cluster. And that's just generally what I see. That's empirical, not tested in any kind of thorough you know, engineering methodology, but that's just what I see.

**Benjamin Howard (12:09)**  
He said this is regardless of scale, is that correct?

**Luke Mccleary (12:12)**  
Yeah, uh, my, you know, my customer with, you know... 30,000 vault licenses. They have a 5 node cluster. It's got, I mean, it's got the performance read standbys, but I'm not even sure they really need this. Like I've just never heard, like they also might not be interrogating their cluster enough to see if they're experiencing performance issues, because establishing all of the, you know, Grafana back-end Prometheus metrics to know if there's a queue building up. They might not really know, so I think most customers are ignorant to

**Benjamin Howard (12:47)**  
Please.

**Luke Mccleary (12:48)**  
whether or not there is a performance issue, but performance issues just don't show up for them one way or another, because whether they're waiting 100 milliseconds, 50 milliseconds, or half a second, that's all mostly meaningless in the deployment of an application. In their use cases.

**Benjamin Howard (13:06)**  
Okay. Now, it's kind of a tag-on question to that. In the event that there is a performance issue,

**Luke Mccleary (13:15)**  
Mhm.

**Benjamin Howard (13:15)**  
with the clients that you're working with, are there plans in place in order to deal with that? And if so, what are they?

**Luke Mccleary (13:25)**  
Since they've never seen him before, they don't even know that they should have a plant.

**Benjamin Howard (13:29)**  
Interesting.

**Luke Mccleary (13:30)**  
Yeah, I would say, I mean, like, they're just gonna open a ticket with us

**Benjamin Howard (13:31)**  
Okay.

**Luke Mccleary (13:34)**  
and be like, hey, things seem to be kind of slow. And if they're slow and still working, it's probably fine. Again, they're not doing, you know, high transactional throughput on the cluster. It's just like maybe a quick burst of restarting some pods. They grab a few dynamic secrets. Maybe it's slow for 30 seconds while it issues all those secrets. And then they probably don't experience any kind of an issue again, if they even did experience an issue. So yeah, I just don't think they just they experienced the sustained traffic that is necessary for them to be like. our credit card processing is slow across our entire network right now for some reason, right? They just don't do, again, that's to the transit engine again, where it's just like, you just need a lot of volume, sustained volume to bring it down a cluster as far as I've seen.

**Benjamin Howard (14:34)**  
So, thank you. And now, let's think of a Federal bulk deployment that hit a wall or had a customer impacting a band under load. What was the trigger, if you do know this? And was there an early warning signal before? before that began. Or is it this same kind of situation where...

**Luke Mccleary (14:58)**  
Hasn't happened. So yeah, I can't tell you.

**Benjamin Howard (14:59)**  
Yeah.

**Luke Mccleary (15:00)**  
There are some of them are worried about it, right? Like we have customers who are like, oh, we really need to have that performance standby because we know we're a high performance customer. And like, I'll take their money, but I don't know that they really actually did any performance analysis on that.

**Benjamin Howard (15:14)**  
Yeah. Makes sense now.

**Luke Mccleary (15:18)**  
Yeah.

**Benjamin Howard (15:20)**  
So as you're interacting, what does the setup look like when a customer outgrows their current setup? What's the right move and resources to that existing cluster? Are they standing up a separate cluster that's split in the workload? And is there a ceiling where you insist on a second cluster regardless of the headroom?

**Luke Mccleary (15:43)**  
I haven't hit any of these challenges.

**Benjamin Howard (15:45)**  
Okay.

**Luke Mccleary (15:47)**  
Yeah, again, like people might not be measuring it, but like until people start really, our customers are just not the big financials that are doing like really heavy hitting work on these things. And they're not doing the analysis to know when they'd hit headroom or hit like a ceiling. And so I just, you know, I just. tell customers to use the generic architectural recommendations. If they did hit something, I would just tell them to add more memory and dump another CPU or two onto the nodes. It scales up, not out. So that's just generally what we do if we did it.

**Benjamin Howard (16:22)**  
In. Yep. You actually took the next question right out of my office, you know, in that instance where that does happen, kind of what steps would you take in order to assist them in the remediation of that?

**Luke Mccleary (16:34)**  
Yeah, I start with up. Yeah, I would start with up and then if that's still not enough, then out because more nodes is not as fun to manage.

**Benjamin Howard (16:45)**  
Okay. Now, across the federal accounts that you've seen, how concentrated is demand? Are most accounts roughly the same size or are there a few that, you know, make the other ones look pretty small? Like kind of what's your largest versus the typical?

**Luke Mccleary (17:04)**  
I mean, I have customers with 25 licenses and I have licenses with our customers with 3000. So it is huge. I try not to, we try not to really get engaged with the really small ones just because it's just

**Benjamin Howard (17:14)**  
Mhm.

**Luke Mccleary (17:17)**  
not really worth our time. Give them the open source, they can kind of figure that out. I try not to sell anything less than 100. Client licenses, but occasionally things slip through. Some legacy contracts exist, but.

**Benjamin Howard (17:34)**  
Mm.

**Luke Mccleary (17:36)**  
Yeah, yeah, no, it definitely. Is a huge. Huge. Variety there, so... Yeah, I don't know how you... How do you slice that?

**Benjamin Howard (17:53)**  
So now when you think about the growth of that, how quickly does a federal accounts fault uses grow once in production? Do you, as you've seen it, is it flat? Is it steady or it changes when new programs are onboarded?

**Luke Mccleary (18:10)**  
Only a small percentage of them are capable of becoming enormous. A lot of them never really grow. They have their need, their agency is what the size of their agency is. It's not like a commercial account where like, you know, they're releasing new products and suddenly their, you know, their revenues are are pumping, the company's growing, it doesn't really happen, right? You know, the... What's an example here? I don't know. NASA is the size that NASA is. If anything, they just kind of get smaller. Their budget gets a little smaller,

**Benjamin Howard (18:45)**  
Yeah.

**Luke Mccleary (18:45)**  
not bigger. There are some changes, like, you know, obviously Homeland Security, sometimes they get a big budget. The folks over in Department of Defense slash war, you know, they'll get big influxes of cash, different new projects. On the civilian side, that doesn't happen as often. So it's pretty, pretty flat. And we usually know going into it what the high end is going to look like because they've asked all those questions up front. So they'll say, hey. Let's get you started with, you know, 300 or 400 Vault licenses. We've already scoped out your full environment, so if, you know, as you grow or as you adopt new use cases, we expect you'll end up here when you know you're a fully mature deployed customer, but that's, you know,

**Benjamin Howard (19:33)**  
So.

**Luke Mccleary (19:34)**  
probably where you'll stay once you get there.

**Benjamin Howard (19:38)**  
In the event there is growth, how can we expedite that process?

**Luke Mccleary (19:43)**  
Say again?

**Benjamin Howard (19:44)**  
In the event that they do have growth, how can we expedite that process?

**Luke Mccleary (19:48)**  
Gotcha.

**Benjamin Howard (19:51)**  
Sorry.

**Luke Mccleary (19:56)**  
I always, and this is a luxury of an on-prem deployment, I've never had to grow a cluster.

**Benjamin Howard (20:01)**  
Nee.

**Luke Mccleary (20:02)**  
We just kind of size it on day one with more or less the resources we expect they'll need. And if they get to a certain size, they can, well, they can easily just add a few gigs of RAM and some CPUs to each node. And it's just a quick, helm redeployment, pretty painless, right? So there's not much to managing that. And again, I just don't run into a lot of

**Benjamin Howard (20:24)**  
So.

**Luke Mccleary (20:25)**  
performance issues on my side. So it hasn't really been a problem. Like when I get a really small customer, I don't like tell them to use some unsupported super small amount of resources to run their cluster. I give them the same guidance as I give, you know, a medium-sized customer. I just follow the minimum sizing recommendations of the architecture guy.

**Benjamin Howard (20:48)**  
Yeah.

**Luke Mccleary (20:50)**  
So, yeah.

**Benjamin Howard (20:50)**  
Makes sense. And what availability do federal customers actually expect from a managed vault? And what recovery time and data loss windows after a regional zone failure do they expect? And does it differ by segment? And if so, how?

**Luke Mccleary (21:12)**  
Absolutely. It's not even different by segment, it's just going to differ within tiers inside of even an agency. Take the FAA for example. They have three availability like networks and tiers. They have...

**Benjamin Howard (21:25)**  
So, I can.

**Luke Mccleary (21:29)**  
Mission essential, mission critical, mission. So there's mission critical, that's like flight systems, there's mission essential, and then there's like support, mission support below. Mission support like could just go down and that would be fine, but you like get the idea. Like as you move up, availability becomes more and more important. When I design an architect, these solutions and we discuss how they should be used.

**Benjamin Howard (21:56)**  
And what is that?

**Luke Mccleary (21:58)**  
We always try to architect the solution to fall outside of a true tier 0 service. Like if it goes down, we don't want applications to start breaking everywhere. Ideally, we want those leases. that we, you know, whatever leases we're pushing out or whatever is going out the door, we want them to have a grace period. Like, I don't know, I would like to see like a day, right, where like, we don't, if the system went down, production could at least keep running for a day or two while we figure out why leases aren't going out the door. That's not always possible. Things like... I don't know, spawn services like Lambda, you know, you need a secret as it spawns, that's just going to break if it's reaching out to vault every time it

**Benjamin Howard (22:45)**  
Yeah, exactly.

**Luke Mccleary (22:46)**  
spawns. So it's not always doable, but we try to architect that, like kind of up and first and foremost, if we can make it not barrier zero,

**Benjamin Howard (22:50)**  
Oh.

**Luke Mccleary (22:54)**  
we will. And then from there. you know, kind of hard to say based off of the agency, how important things are and how long things can be down. But I mean, you're really looking at Hours at the most, right? We need, you need, you need a recovery RPO RTO if like less than two hours for most agencies,

**Benjamin Howard (23:17)**  
It was. Mhm.

**Luke Mccleary (23:19)**  
and for like critical services like that, the FAA, like you're talking like 10 minutes maybe if you need basically push button disaster recovery failover. like that needs to come back online. But I wouldn't build for those guys because they're not going to use a SaaS service like yours in a mission critical service like that. They're going to want to engineer it and manage it themselves.

**Benjamin Howard (23:45)**  
Yeah, OK. Nice. Thank you. Now, when a federal customer states sizing their load in like an RFP or an RFI, how does that compare to what they actually run in production? Are they overestimating that or are they underestimating that? And if so, is there a number that you have of what that typically looks like?

**Luke Mccleary (24:11)**  
Overestimating or underestimating which element?

**Benjamin Howard (24:14)**  
So, what they actually kind of request in the sizing versus what they actually run in production. Yeah.

**Luke Mccleary (24:21)**  
Licensing, like licensing, licensing, yeah. I have very few, I don't think I have any customers

**Benjamin Howard (24:28)**  
Yeah.

**Luke Mccleary (24:31)**  
outpacing their licensing. They either run below or at their licensing. And then we, you know, at the end of the year,

**Benjamin Howard (24:35)**  
No. Yes.

**Luke Mccleary (24:38)**  
we look at where they are and we add 10, you know, whatever growth ramp we expect them to need. So I don't know,

**Benjamin Howard (24:44)**  
Yeah.

**Luke Mccleary (24:45)**  
I hope that answers your question.

**Benjamin Howard (24:48)**  
No, it does. Now, have you seen, kind of piggybacking on that a little bit. When it comes to that licensing, have you seen any outliers or have you seen any kind of drivers that push someone to a high license versus on the lower end of that spectrum? Like any commonalities that you say?

**Luke Mccleary (25:12)**  
They just have a bunch of budget. Yeah, if they just have like a big, like a big, like a lot of end of year money, sometimes they'll just throw, that's like one of the key drivers. Like they're like, oh, we have a bunch of end of year money. We want to buy a, you know.

**Benjamin Howard (25:25)**  
Yeah.

**Luke Mccleary (25:28)**  
buy up our licensing so we can, you know, bring some new workloads online. But it's mostly new initiatives is what drives it. They're either folding in another agency or they're building,

**Benjamin Howard (25:36)**  
Yeah.

**Luke Mccleary (25:39)**  
they're shifting to a new platform and a new architecture. That's what drives most of these deals.

**Benjamin Howard (25:46)**  
Okay. And then if we launched the managed Fed rep vault in the next couple of quarters, what's the one thing most likely to make the federal customer walk away on day one? What can they live with without at launch versus what's a dead deal?

**Luke Mccleary (26:14)**  
What can they not live with out? Mm. Well, like I said, it sounds like the only things that you're thinking of leaving out are like... Some of the same stuff that we left out of the early revs of our HTTP platform, like key management and transit, so I think they can live without that stuff; that's not a problem, as long as they have all of the authentication methods. The base secrets engines.

**Benjamin Howard (26:53)**  
Mhm.

**Luke Mccleary (26:55)**  
Policy management, like, I don't think, I don't think there's anything that you're gonna. that you're going to be leaving out of this that that would stop them.

**Benjamin Howard (27:02)**  
Maybe so.

**Luke Mccleary (27:07)**  
If anything that would stop them, it would be something probably related to how networking is set up, just a guess. Some kind of hurdle with how you tie in with their cloud peering. But because I haven't done, like, I've done like 0 deals in HCP. I have very little awareness of, like, I've done, like, I know how it works, but.

**Benjamin Howard (27:27)**  
Thank you.

**Luke Mccleary (27:32)**  
I think we'd probably want to do some custom interviews to figure out like... Is the HTTP architecture for how we do customer interconnects acceptable?

**Benjamin Howard (27:44)**  
And.

**Luke Mccleary (27:45)**  
and easy enough for them to implement, that's probably the other challenge.

**Benjamin Howard (27:49)**  
Okay, so when you talk about easy to implement, what, in your opinion, can be done in order to make that process a little bit easier, kind of removing those points of friction that currently exist?

**Luke Mccleary (28:02)**  
A lot of them are going to be internal to the organization,

**Benjamin Howard (28:05)**  
Yeah.

**Luke Mccleary (28:06)**  
so that's going to be hard for you to mitigate. I mean, HTTP has done a pretty good job. It's just like, hey, type a few things in here, we'll Terraform out and CloudFormation

**Benjamin Howard (28:15)**  
Cindy.

**Luke Mccleary (28:16)**  
out, all the connection information.

**Benjamin Howard (28:18)**  
There are incident, but as first I location is concerned.

**Luke Mccleary (28:21)**  
I could see agencies that like don't like the automation,

**Benjamin Howard (28:25)**  
I think, like, for example, to meet you over at the bottom right this

**Luke Mccleary (28:25)**  
that maybe that's going on behind the scenes there. It's gonna be, that's just gonna require customer interviews.

**Benjamin Howard (28:30)**  
night.

**Luke Mccleary (28:32)**  
They might wanna manually set it up. I wouldn't be surprised.

**Benjamin Howard (28:33)**  
That's smart. Which, staying on that topic a little bit, what do you think is the main reason why

**Luke Mccleary (28:39)**  
Yeah.

**Benjamin Howard (28:44)**  
there would want to be a manual setup? Is it, is it kind of reliability? Yep.

**Luke Mccleary (28:47)**  
The lack of trust of automation, lack of trust of automation. They're just, they're weird. They're always like, well, I don't know if I can trust this.

**Benjamin Howard (28:52)**  
You know, just go forward.

**Luke Mccleary (28:54)**  
I'll just.

**Benjamin Howard (28:55)**  
He went to work on the people.

**Luke Mccleary (28:57)**  
I don't know. They'll be, they're fickle.

**Benjamin Howard (28:59)**  
I'm saying there's the... Yeah. Now, is there anything you feel like on our

**Luke Mccleary (29:02)**  
Yeah.

**Benjamin Howard (29:04)**  
end we would be able to do in order to make this process a little bit more trustworthy and viable? Sup.

**Luke Mccleary (29:19)**  
Yeah, I don't know. I mean, the first thing that pops to mind is like,

**Benjamin Howard (29:22)**  
Since by.

**Luke Mccleary (29:23)**  
oh, is there a way that we can bypass the public clouds at all and just like directly do a customer interconnect?

**Benjamin Howard (29:26)**  
And just keep.

**Luke Mccleary (29:28)**  
I don't know if that's good or bad, but it might be something they'd be

**Benjamin Howard (29:29)**  
Do you open?

**Luke Mccleary (29:31)**  
interested in. Like just a site-to-site VPN.

**Benjamin Howard (29:36)**  
And now, if you if you sorted through the Federal Vault customers that you know, into a few groups, how they use and scale vault, how many groups would you draw and what separates the most demanding from the modest ones? And does the heavy load concentrations in one group look different from the other? If so, by how much? Niki, I'm gonna so the next time card, right? See if the...

**Luke Mccleary (30:24)**  
EKS, almost, it's almost all EKS, so...

**Benjamin Howard (30:25)**  
Set this like.

**Luke Mccleary (30:30)**  
Yeah, I would say the primary driver of how much fault they're going to use is just how much EKS they have.

**Benjamin Howard (30:34)**  
Standing. OK, interesting.

**Luke Mccleary (30:40)**  
Uhh... There's still some VMware out there, thanks to Broadcom's, you know,

**Benjamin Howard (30:44)**  
Show the same.

**Luke Mccleary (30:46)**  
brutal pricing models. I think that'll almost all be gone in the

**Benjamin Howard (30:46)**  
Yeah, I'll look at some current steps.

**Luke Mccleary (30:50)**  
next couple of years. But yeah, yeah, it's like it's all pretty much EKS driven

**Benjamin Howard (30:52)**  
Yes, yes. Yes.

**Luke Mccleary (30:55)**  
at this point. Some open shift in certain sectors.

**Benjamin Howard (30:56)**  
Yes. Yeah, I can.

**Luke Mccleary (30:59)**  
Like there's a lot of open shifts. in the energy and some of the sciences divisions.

**Benjamin Howard (31:05)**  
Speaker. It.

**Luke Mccleary (31:07)**  
Those are also probably some of the best candidates for the SAS solution.

**Benjamin Howard (31:08)**  
It's the invoices.

**Luke Mccleary (31:11)**  
They're just more open to SAS. Like you're just going to see less

**Benjamin Howard (31:14)**  
This year, yeah, that's the panel.

**Luke Mccleary (31:15)**  
openness to SAS probably in like DOD than civilian. And like the further you get away from kind of like the military industrial complex, the more people are going to be open to using SAS. It's just the nature of things.

**Benjamin Howard (31:29)**  
So, I'm gonna share something out with you, and I'm not sure if you've seen this through a previous conversation with T.J. But taking a look at this and let me know if you need me to zoom in a little bit more on it or not.

**Luke Mccleary (31:44)**  
No, I just got to make my screen bigger. I got a big boy.

**Benjamin Howard (31:49)**  
So looking at these three, these options, what option would a Federal customer more

**Luke Mccleary (31:54)**  
Mhm.

**Benjamin Howard (31:56)**  
than likely pick? And looking at this, going from left to right, the cost increases potentially by times 10 of the third.

**Luke Mccleary (32:04)**  
Mhm.

**Benjamin Howard (32:07)**  
Which one of those options would the federal customers most likely pick and

**Luke Mccleary (32:07)**  
Yeah.

**Benjamin Howard (32:11)**  
why?

**Luke Mccleary (32:12)**  
Yeah, I have seen this and I remember spending

**Benjamin Howard (32:14)**  
Yeah.

**Luke Mccleary (32:15)**  
a lot of time staring at it. I know I ended up in the middle, right,

**Benjamin Howard (32:16)**  
You would have to agree to see it.

**Luke Mccleary (32:18)**  
where it was just like, yeah, they're going to want kind of that middle

**Benjamin Howard (32:20)**  
At that point, either.

**Luke Mccleary (32:22)**  
model. They're just not going to want to share a

**Benjamin Howard (32:24)**  
SC.

**Luke Mccleary (32:25)**  
compute node with another tenant. Is that right? Yeah, multi-tenant nodes.

**Benjamin Howard (32:27)**  
Okay.

**Luke Mccleary (32:29)**  
No, they're going to want tenant-dedicated

**Benjamin Howard (32:29)**  
Yeah, yep.

**Luke Mccleary (32:31)**  
nodes.

**Benjamin Howard (32:31)**  
Hey, Cortana, we were just talking about you.

**Luke Mccleary (32:32)**  
Uh... Three is like the ice, you're probably gonna have to do option

**Benjamin Howard (32:35)**  
But...

**Luke Mccleary (32:38)**  
two and option three. I know option one is a lot cheaper, but...

**Benjamin Howard (32:40)**  
And so, I see.

**Luke Mccleary (32:44)**  
It's probably not worth maintaining all three of them. But I don't know, that's a call for you guys. The IC is going to want to do stuff with

**Benjamin Howard (32:49)**  
So, obviously, the last one, yeah, what did you do in the strings?

**Luke Mccleary (32:52)**  
option three. don't ask me to justify it. They just, it's gonna be off of vibes. They're like, well, we're just more secure. We just feel more comfortable with that.

**Benjamin Howard (33:03)**  
Yeah.

**Luke Mccleary (33:04)**  
And yeah, yeah, all of this is just going to be a vibe

**Benjamin Howard (33:04)**  
Spider. I have a lot to say.

**Luke Mccleary (33:07)**  
based, but yeah, they're going to look at option two and they're like, yeah, I don't want to share a compute node.

**Benjamin Howard (33:10)**  
Right. Yeah, we go back again to interactive, and she said.

**Luke Mccleary (33:12)**  
I don't want to worry about memory leaks or blah blah blah blah blah blah blah. I want single tenant nodes.

**Benjamin Howard (33:17)**  
You. Just that I like best.

**Luke Mccleary (33:20)**  
And.

**Benjamin Howard (33:22)**  
6000.

**Luke Mccleary (33:28)**  
Are they going to mandate a single tenant cluster? No. That's probably unlikely, and those are single tenant,

**Benjamin Howard (33:33)**  
Yes.

**Luke Mccleary (33:36)**  
those are single tenant Kubernetes clusters, right?

**Benjamin Howard (33:40)**  
Mhm.

**Luke Mccleary (33:41)**  
Like the full, full management plan dedicated to them.

**Benjamin Howard (33:44)**  
Yeah.

**Luke Mccleary (33:47)**  
Boy.

**Benjamin Howard (33:48)**  
Spending minutes, and then which one?

**Luke Mccleary (33:56)**  
Nah, I think most people would be fine too.

**Benjamin Howard (33:59)**  
Okay.

**Luke Mccleary (34:00)**  
I do. But people are still going to, but like there will be customers that are going to absolutely want #3.

**Benjamin Howard (34:07)**  
Okay. And with customers that want #3, are those individuals that have larger

**Luke Mccleary (34:13)**  
Yeah.

**Benjamin Howard (34:14)**  
workloads or do you think it's just kind of, like you said, just bye-byes?

**Luke Mccleary (34:22)**  
It's going to be vibes and budget. So if you go talk to the IC, they're just going to have a lot more money and they're going to be like, you know what? It's just not worth me running risk for

**Benjamin Howard (34:31)**  
It.

**Luke Mccleary (34:32)**  
to do #2. I'll just pay for #3. Just give me #3 and then I don't have to

**Benjamin Howard (34:34)**  
Is it?

**Luke Mccleary (34:37)**  
think about it. Financials are probably going to feel the same way. Just a guess. IRS, Federal Reserve. You'll have to talk to the, I'm sure you'll talk to Tim Olson at some

**Benjamin Howard (34:44)**  
Six.

**Luke Mccleary (34:47)**  
point. He's one of the other, you know, very long tenured experience that he's on

**Benjamin Howard (34:49)**  
Tsyn.

**Luke Mccleary (34:52)**  
the team. And he covers Fed financials. So he can tell you probably what their

**Benjamin Howard (34:53)**  
Ngok. Shana.

**Luke Mccleary (34:56)**  
feelings are on that. My customers probably would be perfectly fine with #2. They don't care.

**Benjamin Howard (35:02)**  
Just ask.

**Luke Mccleary (35:02)**  
Tim also has a lot of experience in Intel, so he'll be able to tell you what's up in

**Benjamin Howard (35:05)**  
75.

**Luke Mccleary (35:08)**  
#3, but...

**Benjamin Howard (35:08)**  
Yeah. Remember, go ahead, hyper, like stopping to the bottom. Yeah, yes.

**Luke Mccleary (35:12)**  
But the challenge is, you know, I'll bet there are agencies in the sciences division that would be perfectly fine with number one. And they'd be like,

**Benjamin Howard (35:16)**  
So, we're not there.

**Luke Mccleary (35:19)**  
they don't have big budgets. They need to be able to afford something.

**Benjamin Howard (35:19)**  
Same thing with. No, no, that's some great information. So kind of putting a bow on, you know,

**Luke Mccleary (35:22)**  
So I'm sorry that I can't help you with this. They're all important. Huh.

**Benjamin Howard (35:30)**  
the key question that we're trying to solve for. Do you feel that,

**Luke Mccleary (35:36)**  
Yeah.

**Benjamin Howard (35:38)**  
do you feel that... limits or understanding kind of what is needed to provision is an issue that we should be focusing on or Due to the lack of issues that could potentially arise that you mentioned, you see those limits as something that is something that we should like dive a little bit more into.

**Luke Mccleary (36:09)**  
My biggest customer challenges? all come from initial deployments. I sold deals into the Department of Energy five years ago, and they just keep renewing because

**Benjamin Howard (36:18)**  
Just.

**Luke Mccleary (36:22)**  
they've never deployed them. It's always been the biggest challenges.

**Benjamin Howard (36:26)**  
Mhm.

**Luke Mccleary (36:27)**  
Onboard your customer, get them to start consuming. So I think more than anything else that you're focusing on, which features to deliver, will it be performed? Enough, what architecture should we deploy for them? I would focus the... Lie and share my energy doing customer interviews and determining what onboarding workflows. Are best for them and make it easier for them to get on board, cuz that's the only thing that's really gonna matter here. You can tweak some of this other stuff later, you could even ****, maybe you end up going with the number two option here, but there's like a low resources node model that gets it closer to option one for those. you know, cheap customers that are out there and don't have a lot of money. I don't know. Maybe you can play with this a little bit.

**Benjamin Howard (37:20)**  
Okay.

**Luke Mccleary (37:20)**  
But this is all fixable, but if your onboarding workflow sucks, no one will ever join your service.

**Benjamin Howard (37:26)**  
Yeah. No, yeah, exactly. Well, that is all that I have. Is there any more information you think would be relevant to share as we continue to push towards this? You've mentioned the onboarding process kind of in your perfect world. Do you have an idea of what that would look like?

**Luke Mccleary (37:46)**  
I don't because I still haven't seen one that the company has created that's good. Sorry, it just is true.

**Benjamin Howard (37:54)**  
And do you think that that's from our end or is it?

**Luke Mccleary (37:56)**  
Uhh... It is absolutely from our end, yeah. We have never had a focus on usability of our product. We've only cared about like.. . Can we do stuff from a console and is it flexible? We've never had an opinion on what people do. It's always been a problem. We just need to customers want to be told what to do, or at least have like some guidance on how they should do stuff, and they need more UIs and wizards and... just maturity nudges that just don't exist within our product. It's a total nightmare, people. It's just a free for all choose your own adventure that is. It just didn't scale for us or whatever, it's fine. The only other thing that I would mention is I'm also concerned about migration

**Benjamin Howard (38:39)**  
You.

**Luke Mccleary (38:43)**  
workflows. You didn't ask about it, I'm sure you've thought about it, but it's probably something, I don't want to call it an afterthought, but it is something you're going to worry about maybe later. But if you want the service to be successful, you also need to Be trying to pull in the existing workloads that are out there, provide incentives for people to make that jump, make it easy. I don't have any recommendations on how to do that either, 'cuz it's a complex product to migrate. You'd have to like...

**Benjamin Howard (39:13)**  
Thank you.

**Luke Mccleary (39:16)**  
pick up a namespace and all of its associated artifacts and drag it into the cloud somehow. It's probably doable, but I mean, I'll leave that up to you.

**Benjamin Howard (39:26)**  
And do you feel like there's a little bit of skepticism on that one as well? When you talk about the ability to do it in terms of like reliability.

**Luke Mccleary (39:37)**  
Dude, it's so hard to get these customers to

**Benjamin Howard (39:38)**  
And, pro, it needs a process.

**Luke Mccleary (39:40)**  
deploy. Yeah, like it's hard enough just to get these customers to deploy use cases. Nudging them to move that use case without like a lot of immediate operational or value to them is like, that's really tough. Like getting someone to be like, hey, I know that your on-prem vault is running and it's working well. Do you want to do some extra work to just move that to the cloud?

**Benjamin Howard (40:02)**  
Mhm.

**Luke Mccleary (40:02)**  
Yeah, it's going to be a tough sell.

**Benjamin Howard (40:05)**  
And what do you feel would make that a little bit easier for them to do that?

**Luke Mccleary (40:09)**  
just all about reducing friction. If you can come up with a really seamless

**Benjamin Howard (40:11)**  
Yeah.

**Luke Mccleary (40:16)**  
way to duplicate an on-prem deployment or a fragment of it and cut over to the cloud on like ideally instantaneously, That would change the game.

**Benjamin Howard (40:31)**  
So that was an idea.

**Luke Mccleary (40:31)**  
If you could just change a pointer and then just be like, cool, now you're pointed at the cloud. That was flawless. You didn't have to do any endpoint reconfiguration. It just works.

**Benjamin Howard (40:40)**  
So I ran this idea by Sarah and she said, you know, she might run with this, but do you feel this would solve the issue? So essentially doing that initial kind of onboarding and provisioning, you're standing up essentially to two clusters, one that you would be able to what your workload on and another one that's kind of like a different branch of that is an environment where you can upgrade. And now, similar to how you would work with like different branches in GitHub, where you have your main branch and you can have a secondary branch. Then once you're satisfied here, then you could be able, or provisioning or moving things over, then you would be able to then just essentially shift and merge it. Is taking that time and that initial setup to do something like that, do you feel like that would help solve the key issue?

**Luke Mccleary (41:35)**  
Yeah, we haven't talked about this, but most of my customers run a dev cluster somewhere in their environment. Nearly all of them,

**Benjamin Howard (41:41)**  
Yep.

**Luke Mccleary (41:46)**  
especially the ones at scale. So they're all already running a dev QA upgrade test use case management cycle. So I would almost

**Benjamin Howard (41:52)**  
Yeah.

**Luke Mccleary (41:56)**  
think that it would be 100% necessary for any on.

**Benjamin Howard (41:58)**  
Um...

**Luke Mccleary (41:59)**  
It's certainly an existing customer, but I think even new customers are going to want that playground to be included in their contract. So a scaled down version of their environment that lets them do all that testing and even test failing into the cloud or cutting over to the cloud. Yeah, that's a step in the right direction for sure. But I think it's a tooling. We need to make our tooling like rock solid to help them. Otherwise they won't do it. Like it's just too much work.

**Benjamin Howard (42:29)**  
Mhm.

**Luke Mccleary (42:31)**  
We will have to do that work.

**Benjamin Howard (42:34)**  
And do you think that there's a good communication between you and the clients? And so if some of their like security parameters change or things change within that, is that information communicated to you that would help facilitate the ease of that process?

**Luke Mccleary (42:52)**  
Provide an example, what do you mean?

**Benjamin Howard (42:55)**  
So, for example, it's let's say the running and upgrading the upgrading to the CLI. Now, if something changes on their end with security provisions and we come out with a new version and that version isn't compatible, more than likely it's because of some security or internal changes that have been brought down by them. is that then transmitted to you. So as they go through this process of, you know, either migration or upgrading or provisioning something else, if it's not compatible because of something on their end, they're not going to know that because they did communicate that to you.

**Luke Mccleary (43:35)**  
Yeah, we have status calls with all of our major customers at least every other week. I'm pretty sure that information will come to me.

**Benjamin Howard (43:43)**  
Yeah, perfect. All right. Well, that's all I have for you. Thank you for taking the time. I think this has been really instrumental in making sure that we're trying to move into the right direction and get, you know, if a better understanding of the rate limits. And if that isn't the key issue, then being able to pivot a little bit and focus on the key issue, which it seems for you is like that first step in this that onboarding.

**Luke Mccleary (44:08)**  
Mhm.

**Benjamin Howard (44:11)**  
Awesome. Would you have anything else for me, Luke? And I will add, so once I consolidate all this information, I'm going to share it out with everyone that I've talked to so we can kind of have that repository of knowledge that's being passed around about what some of the key issues are, and then that'll allow us to all get together, brainstorm, and think about how we can solve some of the issues that have been identified in this research.

**Luke Mccleary (44:34)**  
Sure. All right.

**Benjamin Howard (44:37)**  
Awesome, will I give you some time back? Yeah, of course. Thank you.

**Luke Mccleary (44:37)**  
I mean, if there are questions, I guess. Yeah.

**Benjamin Howard (44:41)**  
Have a good day.

**Luke Mccleary (44:42)**  
Yep, good meeting. Take it easy. Bye.

**Benjamin Howard (44:44)**  
Bye.
