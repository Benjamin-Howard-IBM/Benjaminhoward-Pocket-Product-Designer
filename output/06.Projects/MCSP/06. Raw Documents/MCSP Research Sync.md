# MCSP Research Sync

**Recording:** MCSP Research Sync-20260604_120525-Meeting Recording
**Date:** June 4, 2026, 5:05 PM
**Duration:** 27m 33s
**Participants:** Benjamin Howard, Sara Snowden

---

## Raw Transcript

Benjamin Howard started transcription

**Benjamin Howard** 0:08
And...
Boom. Right, good to go.

**Sara Snowden** 0:15
Okay, so what I was saying is the root namespace is the issue. So customers that are Vault Enterprise customers, they cannot migrate to Vault Cloud because they operate in different namespaces. So when a Vault Enterprise customer sets up their cluster, they get root access because they've got to do all the configurations, right?
Now, root access, the root namespace, a lot of things are tied directly to it. So there's different permissions, there's different things that they can do. They can apply global policies, so all their child namespaces, every namespace under it will inherit them. So there's a number of things that they can do.

**Benjamin Howard** 0:54
Mmh.
Yeah.

**Sara Snowden** 0:56
In Vault Cloud, we retain root namespace for us to be able to manage the customer's environment. So that allows us to upgrade their clusters, that allows us to patch things, that allows us to enable snapshots, enable DR. So we give them admin namespace and they can do many things.

**Benjamin Howard** 1:03
Yeah.

**Sara Snowden** 1:18
Not everything though, but we do, we withhold all of this so that, and we do it for them, so we will take the APIs that allow customer to set up a DRDR, right? So we keep that, but we'll put in, you know, we'll build the solution, we'll extend like...
you know, permissions for them to be able to do it, execute it, but behind the scenes, you know, we retain the ownership of it, basically. That's a terrible way to explain it, actually.

**Benjamin Howard** 1:44
Yeah, so basically like like visibility.
So they have more like visibility to a certain extent.

**Sara Snowden** 1:48
And.
We extend certain capabilities to them in a way that they can't mess anything up. Because one of the challenges is just because of how the namespace, and we're learning this firsthand, how the namespaces are situated, a customer can hit the endpoint that says replication.

**Benjamin Howard** 1:58
Yeah.

**Sara Snowden** 2:11
the replication endpoint, and it would inherently pick up everything within that environment if it wasn't restricted from them. So that means they would actually pick up what we have access to and control of, as well as their stuff, which also means other customers. So we have to hide it from them.
Now, our team found a brilliant hack in order to...
take those protected endpoints, those things that give way too much power to customers, to hide those and still give them the root namespace and many of the functionality that they could get if they're in Vault Enterprise, but not everything. So we retain the sensitive stuff.
the customer gets other good stuff, but they can operate in that room namespace. Now, we're building out a solution where we use a number of different policy types in order to do that. We have a solution where it's much cleaner. It's like they turn a listener on just for us. They create a namespace and they put these protected endpoints into that namespace for us. It's much more elegant, much more efficient.
But it takes a different team to build that and they don't have capacity because of course it's the same team that's doing all of the NHI work, which is like the most critical company-wide or vault-wide priority. Anyways, so us being able to give customers root means any self-managed customer or enterprise customer.
could migrate to cloud.
Today, if a customer wanted to do that, they've got there is a script they can run to basically bring their namespace down to admin; they lose a lot of functionality, and then they've got to, I think, basically manually update every connection and everything that they do, so the customers.
that I know of that have, I only know of I think 2 customers that have done it. One, their setup basically flattened everything. It did not work because they were far over capacity. There's no, there's very different limitations on the cloud side. And then another customer and it took them like 3 years.
to migrate over. So it's been a very big pain point. It's been a blocker for a cloud. Now, in the federal environment in particular, this is so, so critically important. So you're not going to have your ICs and your DOD agencies putting all of their secrets willy-nilly.

**Benjamin Howard** 4:25
Wow.

**Sara Snowden** 4:42
in cloud, right? They want FedRAMP. They have to have FedRAMP. But what this does open the opportunity is, can I create some sort of digital twin of their enterprise environment? And they can test things in this environment, not with real secrets, not with live data, but they can set up different configurations. They can set up different models.

**Benjamin Howard** 4:44
Mmh.

**Sara Snowden** 5:03
and they can do all that learning quick and easy without having to spin up all of the infrastructure and stand vault up.

**Benjamin Howard** 5:10
So.
So, basically...
If I'm understanding this right, it's like when you, like when you're like upgrading clusters, for example, instead of just like clusters being like upgraded at the same time, you would have like a subset of like different clusters, and then those clusters would run like an update and it would start migrating over, so you're not using.
you're not losing, like having to go like downtime or like anything like that. So it's basically spinning up like a sandbox environment to make any changes and then it could eventually like migrate over if you want it to.

**Sara Snowden** 5:47
Not quite. We're mixing a bunch of different use cases together. So the first one is where we could take like customers set up vault in very, very unique ways. And you'll, did you hear the Navy customer call? Or are they talking about the, no, Air Force. I think it was Air Force or Navy where they basically have like a vault in a box and customers are.

**Benjamin Howard** 6:02
Yes.

**Sara Snowden** 6:10
people like soldiers on the edge can get their credentials that they need, like completely off the grid, 30 days at a time. Like they've got like entire like self-contained like units to where they can deploy these and mission-wide, you know, everybody can update and get all the secret information that they need and go about their day and operate the way they need to.
and they only have to get like refreshed information on very, you know, set cadences. But this is what I'm seeing is we can't duplicate that, like customers use Vault in very complicated ways. So that's one part of it.

**Benjamin Howard** 6:36
So...

**Sara Snowden** 6:47
To stand Vault up is a whole lot of work, requires a lot of resources, a lot of networking, a lot of compute, setting up storage and databases. It's just a ton of work. Vault, we do that in the cloud for them. They don't have to worry about any of that. So it's possible in this future world if we're operating in the same namespace and customers would have
pretty much the same controls that they would need in their on-prem environment. They could create basically a sandbox environment to where they can test out any type of configuration they want. They can...
Basically use it, you know, spin up a cluster, tear it down. They could spin it up, test a bunch of things, tear it down. And it takes them a few minutes versus weeks or months. So that's a big thing. Just testing in general, so not even trying to create a digital twin of their environment, because there would be some configurations where.

**Benjamin Howard** 7:37
Yeah.

**Sara Snowden** 7:44
customers would want it set up the way they would normally set things up for testing purposes. But they could test out brand new ideas and concepts. They could, some if it's not sensitive data, like overly sensitive, like where it needs like IL5 or 6, they could use Vault for actual.
you know, specific use cases. So there's a number.

**Benjamin Howard** 8:06
So is this it?
So is this an instance where they would have, like, from what I'm hearing, they would have to go and set this up if they wanted to. But is there...
a world that exists where once they are spun up, that environment is automatically created for them. And so it would be able to, you know, they would be able to like start running those tests like immediately if they were to do anything instead of like waiting to get that spun up. So something that's automatically included.

**Sara Snowden** 8:35
So.

**Benjamin Howard** 8:37
Like developing, like kind of like developing a different GitHub branch. You know, you have your main, and then you can create whatever sub-branches from that, and then you can sync the two branches if you'd like to.

**Sara Snowden** 8:48
That's not...
quite what I was thinking, but that's not completely out of the question. That'd be difficult though. I'm going to be honest with you. That would be difficult. And that would definitely be our core team would have to do the bulk of the development work on that, if not all, because it would come from there. But that is a very interesting idea.
to where a customer deploys their on-prem, gets it set up, and maybe they click a button and say, you know, create a cloud version for me. Like, and we just, that is a very interesting idea, and it's a much better user experience than I was thinking, because often customers do have to do things in more.

**Benjamin Howard** 9:19
Yeah.

**Sara Snowden** 9:31
Labor intensive ways, because we we don't make things as easy as we could, because it's complicated and takes a long time, but...

**Benjamin Howard** 9:33
Yeah.
Bill.

**Sara Snowden** 9:43
What is this?
Sorry, I've got a thing next that I don't know what it is.
Okay, sorry. I apologize. So love that idea. I might run with it and take credit for it. Your brilliance. Luckily, this isn't recorded. Just kidding.
Um...
Yeah, that's an interesting, that's an interesting idea. That's way future case though. That's, you know, way down the road because that would be enormously complicated.

**Benjamin Howard** 10:08
I love working with you.
Yeah.
Yeah.

**Sara Snowden** 10:21
Yeah, but I really dig it. And there would have to be a lot of demand for it. And I think us getting into the FedRAMP space is going to raise our visibility big time in public sector. And I think, you know, with some starting to generate some pipeline and generating more interest, I think we're going to start.

**Benjamin Howard** 10:26
Yeah.
Yeah.

**Sara Snowden** 10:42
getting a little bit more weight to where we can say like, hey, here's our demand.
Please help.

**Benjamin Howard** 10:49
Yeah, and I think that there's definitely like a need from like, you know, watching the videos, one of the things that they talked about and, you know, I assume that's why we're going for, you know, the top of the top tier, but they talked about, you know, the different, you know, basically, you know,
contain versions of the internet. And that's what we used to use all the time. Yeah, and that's what we used to use all the time. So like when we were downrange, we would be using Sipper all the time and then uprange you're using like Nipper because it's just, you know, pretty much open. So that would be when you're squadron. And then we would have these things called Toughbooks where we'd

**Sara Snowden** 11:10
Oh, Sippernet and Nippernet.

**Benjamin Howard** 11:27
It was what you were saying. It's getting like specified like data and information at certain times because it was not connected. Like we would like do all our chats and everything through like this private like network called Merck Chat. And then Merck Chat wasn't connected to like these main networks and it would allow us to get information.
on like a cadence and everything based off of like some super stuff. So yeah.

**Sara Snowden** 11:50
Mhm.
Yeah.
And that's exactly the type of use cases that they're able to start supporting. And that's enterprise is doing that now because we've not been in that space. And we wouldn't have a connection to NIPR or SIPR. I don't know if that's possible. Because yeah, no, those are completely self-contained. You can't have anything coming in or out.

**Benjamin Howard** 12:15
Yeah.

**Sara Snowden** 12:16
But there are, I remember somebody telling me about something where there are some small ways to where you can do things. Regardless.
And the cloud version is not necessarily going to be for, you know, the the theater type of situations. That's just, you know, not necessarily the case. But when we think about, you know, the people who go and figure it out to set things up that way, getting them access to resources quicker and getting them enabled faster.

**Benjamin Howard** 12:34
Mhm.

**Sara Snowden** 12:50
is going to unlock different than being able to address those other use cases much more effectively and quickly. So it serves a need. It's not the whole need, you know, like it doesn't replace enterprise at all. Like, no, definitely not. Especially in Fed, you know, especially in the intelligence community, like.

**Benjamin Howard** 12:57
Yeah.

**Sara Snowden** 13:09
They're not going to put **** in public cloud. But when we think about some of the like more insecure aspects of the data that they have to handle, their HR stuff, their other systems, I mean, they're all under mandates to modernize and move to zero trust. And they're all, you know, across the board. So we're going to see increasing use cases to where.

**Benjamin Howard** 13:09
Mhm.
Oh yeah.

**Sara Snowden** 13:30
It's cheaper and easier if they're doing things in GovCloud versus trying to get something on, let's say, on NIPR or SIPR, because that's a whole different, you know, bureaucratic process to follow.

**Benjamin Howard** 13:41
Yeah, and I was looking when I was diving into the FedRAMP stuff, there's this like, I like FedRAMP like X or something. It's like their, like their guy, yeah, to like to get compliance and everything and to to move up to a space where they've evolved because as one of those recordings said, that is the thing. It's.

**Sara Snowden** 13:49
They're faster program stuff.

**Benjamin Howard** 14:03
what the military tends to move slow because everything's in like legacy systems. And because everything's in legacy systems, like...

**Sara Snowden** 14:12
And nobody can get into their mail, if I remember correctly, ever.

**Benjamin Howard** 14:16
Yeah, it's like it's like terrible. And that it's because of how large, you know, whether you call it the DOD or the DOW now, it's because of how large it is and how much information is contained. That's the issue with adoption.
It's because of that process of getting everything changed over, so...

**Sara Snowden** 14:39
And everything is tied to everything else.

**Benjamin Howard** 14:42
Exactly. So what it has to do, it has to like start in like a bubble up type fashion. And then I'll jump into other stuff, but it starts at like squadron levels. And then from squadron levels, you can go up because there's like certain information that you have within each one of your own spaces.
And then if you can get that transferred over, and then it just starts building and bubbling up. But it's so long. Yeah, it just has to be, yeah, it has to be an easier, easier process to get everything, you know, upgraded and transferred. But because the military, the DOD, DOW, whatever you want to call it,

**Sara Snowden** 15:07
And right now, it's all paper.

**Benjamin Howard** 15:21
you know, certain aspects of it, the federal side. It's because it's a 24-hour, 365 machine, it's difficult to do that, to go, cool, we're going to make things go down for a little bit in order to make these changes, in order to do this, or to migrate. Yeah, it's.

**Sara Snowden** 15:30
Thank you.
Yeah, right. People die if you do that. People lose their pay if you do that. You know, like there's serious consequences and hardships. It's not like if our email's down for a day, I'm sorry, we're going to be stressed out and cranky and fussy, but not, then we're fine. It's not a big deal.

**Benjamin Howard** 15:38
Exactly.
Exactly.
Exactly. And I think that that's, yeah, that's why I'm always calm about things.

**Sara Snowden** 15:53
We're not life or death.
See, I'm not.

**Benjamin Howard** 16:00
Yeah, see, I'm perpetually calm. I remember one time, and I'll jump in the other stuff, we were in our second year of training and we were putting together weapons, like all sorts of like heavy machine, like heavy machine guns and everything. And we were being timed.
And my team, they were like, man, like get intense. And I was just like doing my thing and just kind of going. And I remember my team lead was like, man, Howard, you are cooler than a polar bear in the Arctic. I was like, I'm just like always just, okay.
It's gonna work; we'll get there.

**Sara Snowden** 16:42
That's some nice little accolade.

**Benjamin Howard** 16:43
Ohh.
Yeah, so that's good.

**Sara Snowden** 16:46
I like it. Nobody's ever once said that about me, ever. Ever. It's usually more like, calm down. Simmer down.

**Benjamin Howard** 16:54
Yeah.
No, I feel that. I wanted to show you, wait, I wanted to see if you had a chance to go over.

**Sara Snowden** 17:04
So I opened it today, but the, yeah, I had one escalation after the other this week.

**Benjamin Howard** 17:08
The.
No, no worries.

**Sara Snowden** 17:12
I have to do like all of the infrastructure, the platform, and then the feature stuff, and then the FedRAMP stuff. So it's been a very, very swirly couple months, but this week has been, and last week have been particularly crazy. I, you know, I opened it up though, and on the first line, there was actually...

**Benjamin Howard** 17:26
Yeah.

**Sara Snowden** 17:33
I want to change some context for you. So it says MCSP, very top, MCSP needs to launch a FedRAMP ready managed vault offering. So it's not quite it. So MCSP is the underlying platform, quote, quote, it's not really a platform. They help provision some of the services. There's a little bit of UI, but it's really.

**Benjamin Howard** 17:39
Good.

**Sara Snowden** 17:55
Vault wants to land, launch a FedRAMP high offering.
MCSP is kind of just, that's the platform that we're on.

**Benjamin Howard** 18:06
Okay.

**Sara Snowden** 18:07
But it's not the star of the show. Volta is the star.

**Benjamin Howard** 18:11
Yep.

**Sara Snowden** 18:11
So I just want to change that because like...
It's the context.

**Benjamin Howard** 18:16
Yeah, no, that makes sense. Okay, I'll get that. I'll get that changed. I did include the script as well.

**Sara Snowden** 18:24
Okay.

**Benjamin Howard** 18:27
Maybe I was this on?
Oh yeah, this is a script. Sorry. Yeah, so this is a script. Yeah, perfect. I think what I did is, I hate this little bar, get out of the way. There it is, this is the research plan. And so I'll make that change there too. And then, yeah, this is the script that it links out to. I really focus on the quantitative.
aspects of it because a lot of the qualitative information was covered during the sessions that TJ had conducted. And what I did is an analysis of those sessions and I watched all six of them.
Read his.

**Sara Snowden** 19:06
There were six? I thought there was four.

**Benjamin Howard** 19:09
Oh no, there were six of them.

**Sara Snowden** 19:11
Oh, geez, Luis.

**Benjamin Howard** 19:12
Yeah, there are only two that were like, you know, an hour each. Everything else was pretty much like 30, 45 minutes.

**Sara Snowden** 19:19
Okay, I remember one of them was just boring. Like, I don't know how TJ didn't like, come on, come on, give me something. Like, get sassy. Like, because they were just dullards. They just weren't, they did not want to be there. And I can't blame them. You can't always know.

**Benjamin Howard** 19:26
Yeah.
Yeah.
No, I can tell.

**Sara Snowden** 19:38
the answers to some of these questions.

**Benjamin Howard** 19:43
But yeah, and that's what I wanted to do is I captured that, and then I came up with some questions, and then what I did is cross-reference those questions. I won't go in all to what I did, but I kind of show you we're actually going to enter the IBM Bob program. I've created a...

**Sara Snowden** 19:43
But.
Oh, you nerd.

**Benjamin Howard** 20:11
Yeah, I went straight nerd. My brother has always called me a cool nerd growing up.

**Sara Snowden** 20:13
So...
That's awesome. That's the best kind of nerd to be. So I'm actually, before we lose Gemini, I'm actually hitting the RFP folders with some questions. So I'm doing that in background earlier today.

**Benjamin Howard** 20:20
Yeah.
Okay, and so this is actually...

**Sara Snowden** 20:33
I can between my things.

**Benjamin Howard** 20:35
So that's actually what I was going to ask too. So what I've been trying to do, because we want to understand, you know, what like SLAs exist and things like that. So what I've been doing is taking these, and I hope you can see my screen, I've been going through each one of these file folders and taking these RFIs,
And then trying to, so like getting this army one, and then looking at like the questions that they're asking and things like that, so that we can know, okay, these are the certain things that need to be answered in each one of these things, this is the analysis, and then there's some HashiCorp ones in which they've answered things. But I wanted to make sure that that was on the correct path of understanding that. So it's all these RFIs.
I saw click into one, for example.

**Sara Snowden** 21:22
That's so freaking ****** and forward thinking. I love it, love it, love it, love it. So not necessarily, some of that will help for what we have to do with us figuring out what our limits need to be, like absolutely. But that also helps future proof us. So now the next time we have a question, we can hit

**Benjamin Howard** 21:39
Yeah.

**Sara Snowden** 21:41
whatever your Bob thing, we can hit that with some, hey, this is what we're looking for. And it would theoretically have this information. So this is clutch. I love it.

**Benjamin Howard** 21:52
Yeah, so I'm taking all of these and I'm examining those finals questions and then I'm going to ingest all that information into, that's why I'm saving it all in that file here in order to start ingesting it all.

**Sara Snowden** 22:03
Yeah, I wouldn't read it though. I'd just pop them in there. Jaywax, Jaywalk, Jaywalk, Jaywax. That's the other internet, isn't it?

**Benjamin Howard** 22:07
Yeah, yeah, yeah, yeah.
Uh-huh.

**Sara Snowden** 22:14
That is it. Joint, joint warfare.

**Benjamin Howard** 22:14
Is the...

**Sara Snowden** 22:18
I forget, okay, so when we were talking about supernet, nipper net, I'm like, there's another one.

**Benjamin Howard** 22:19
Yeah, oh, I forget too, yeah.
Yeah, yeah, so the J-Wicks, if I remember it correctly, that's predominantly, that was used predominantly by like air units and we would utilize that.
I want to say that that was right. Yeah, it was predominantly by the air units in order to do coordination. Let's see. Let's loogle it.

**Sara Snowden** 22:51
Intelligence community.

**Benjamin Howard** 22:52
Yeah. Yeah. Oh, there we go. Yeah. And so this is what we use to get like airplanes, things like that. And then the, what is that called? Intel guys, whether we would need like dumps on targets, things like that, it would all come through the JWICs pretty much.
And then that's how we would get pumped out all vendor for information, and so yeah.

**Sara Snowden** 23:12
Interesting.
When my husband was deployed, he did network communications, and he was with the groups that also did the satellite comms. I have to figure out which one of these systems he worked in, because they're responsible for keeping it up and running.

**Benjamin Howard** 23:23
Mhm, mhm.
Yeah. And so yeah, we would use sat every now and again. Not really. It would be if like if I was in like a pretty tough situation, I would have like a satcom, like a little satcom satellite hooked up and everything that I would just be able to like pull out of my kit. And it was weird because you would just like hold it up.

**Sara Snowden** 23:49
Like what you see in TV. Oh, like, like a teeny little like.

**Benjamin Howard** 23:53
Yeah, so.

**Sara Snowden** 23:54
Rabbit ears, like for TVs back in the day.

**Benjamin Howard** 23:58
Yeah, it looks like a spider web, so let me, let me save.

**Sara Snowden** 24:01
Does it?
Because the set satellites were a huge band satellite thing set.

**Benjamin Howard** 24:12
So that, so this is what it would look like right here.

**Sara Snowden** 24:15
Yes.

**Benjamin Howard** 24:17
And so...

**Sara Snowden** 24:17
I've seen that in TV shows and movies.

**Benjamin Howard** 24:20
Yeah, and then you can like, that was, you could put like more and then you can extend it out slightly more. But so what I used to do,
So, like, this is what I would have it hooked up to. So this is what I was telling you. This is the tough book. So on the tough book, yeah, that's what I would have. And then I would hook it up through a satcom. And that is what I would need to get like some raise. So write exactly what they have right there. If I needed some like high level stuff, that's what I would.

**Sara Snowden** 24:43
Yeah, yeah.

**Benjamin Howard** 24:55
do and that was just to talk to like higher ups. My radios always reach the aircrafts, but if we needed to headquarter back, that's what I would like to use and I would set it up. And then you can like set it up on the ground if you need to as well.
While we're on here, this is something really cool.
Oh wait, I think that they, I think that they changed it. I know this is getting off, this is getting off topic.
But I wanted to show you, I think that they changed it. I think it's gone now.
Uhh...
Oh, they did change it. Oh, no, they didn't.
They did.

**Sara Snowden** 25:53
I got to jump to my next meeting. I will review this. It'll just be later today. I'm so, so, so sorry I didn't have a chance to do it before. I do want to prioritize my Gemini searches just because Gemini is so much better. And I'm getting some pretty good intel, decent-ish at least.

**Benjamin Howard** 25:57
Hey.
Yeah.

**Sara Snowden** 26:14
So I want to hit that up and I'm doing that like in boring meetings and then in between. But I will definitely read through and provide feedback on the study to this evening or later this afternoon.

**Benjamin Howard** 26:24
Yeah.
Yeah. And then when we get that, then we can start the recruiting and start jumping into things.

**Sara Snowden** 26:31
Yes, awesome. Thank you so much and I'm so sorry for the delays. It's just been wonky. I'm super pumped though. This is looking good and I love what you're building and I want to geek out because I am not hands on tech. I want to be. I'm not there yet. But yeah.

**Benjamin Howard** 26:35
No, no, no.
Yeah.
Yeah.
We'll get there, alright.

**Sara Snowden** 26:50
That looks that looks like some fun stuff you're working on.

**Benjamin Howard** 26:53
Right, well, jump to your next meeting. I'll wait for the stuff, and then I'll continue to working on that, get those ingested.

**Sara Snowden** 26:58
And we're going to need to talk about logging because you might have to help with build out some designs for logging.

**Benjamin Howard** 27:07
Okay.

**Sara Snowden** 27:09
Let's touch base on next. I'm still formulating out what it's going to look like. It's going to be an easy, squeezy, nothing like multi-pane, nothing crazy like that. It'll be very simple. But yeah, I'm starting to frame that out.

**Benjamin Howard** 27:18
Yeah?
Awesome. All right, well, take care, Sara. I will talk to you later, and it's gonna be all right. It's gonna be all right. Good. I'll talk to you later. You too. Bye bye.

**Sara Snowden** 27:27
It is. I hope so. I feel better.
Have a good one. Bye.
