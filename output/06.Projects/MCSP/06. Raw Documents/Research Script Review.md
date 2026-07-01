# Research Script Review - Meeting Recording

**Date:** June 11, 2026, 5:02PM
**Duration:** 30m 8s
**Attendees:** Benjamin Howard, Sara Snowden

---

Benjamin Howard started transcription

**Sara Snowden 0:16**
They wish there could be just a permanent acceptance. Like, I'm not going to change my mind about it. Like, it's cool, for real.

**Benjamin Howard 0:19**
That. Yeah. Right. Yeah. OK, I got the I got the script up now. What I feel what I figure we could do. Is, ohh, sorry. Let me share this. Okay, hopefully it's sharing the right there. There we go. All right, got the script up now. Go and change this part. And then, so what I figure we can do is go through each one of the questions. Once, you know, we'll get the core questions out the way. Those are fine. But we can go through each one of these. And then you can say like, yeah, we're not going to get this data, or maybe this isn't as important.

**Sara Snowden 1:17**
Can you zoom in?

**Benjamin Howard 1:20**
Of course. Is that good or one more?

**Sara Snowden 1:26**
do one more.

**Benjamin Howard 1:28**
Okay.

**Sara Snowden 1:28**
Like I see more gray screen than I see actual the Word doc, but yeah, that's good. Okay, can you go up a little bit? What were the...

**Benjamin Howard 1:31**
Hey. Yeah. So this is just the warm up. Yeah, this is just warm up framing questions here. It starts getting really into the meat and potatoes here as section, you know, section 1. So

**Sara Snowden 1:39**
OK, we're not OK. OK.

**Benjamin Howard 1:53**
Any question that you feel that we're not going to have the data on, or you feel maybe isn't as relevant as we'd like, what we could do is identify that question, either by extracting it or deprioritizing it. And so basically, we can assign like levels of severity to like each question or like I said, the questions that are out of, you know, out of scope, what we can do is just simply highlight those and then we'll put a strike through on them.

**Sara Snowden 2:23**
One and two are the most important things that we need to know. It's highly unlikely they are going to know. So I think we just need to... you know, be prepared for that, because that's what we're trying to solve for, right? Is understanding basically what the, how customers are using it so we can, and what that scale looks like so that we can ensure that we're set up to support that properly. And it's always going to be different in cloud. And we know that. But that is what we're trying to understand. So I do expect very... high, high level, if any answers to that. It's highly likely it'll be known, but that is what we want to get to. Yeah. Hmm. Q3 they might know. You can just say secrets, you don't have to go KP entries, because that could be PKI, it could be, you know, it could be a number of things. But it's not really secrets per cluster, it's secrets per secrets engine.

**Benjamin Howard 3:37**
Yeah.

**Sara Snowden 3:45**
is really what you want to know because you want to see what that usage pattern actually looks like and that's what our data does not show us. So we can see that they have KV v2, right? But we don't know how many secrets necessarily they're pushing towards it. We might see...

**Benjamin Howard 4:02**
Mhm.

**Sara Snowden 4:04**
and they have to look again at the data. We might have an overall secret count, but we don't know how that breaks down per engine. So you might want to...

**Benjamin Howard 4:10**
Okay.

**Sara Snowden 4:16**
That one might be kind of a flexible question. So they might be strictly using it for PKI, or they might strictly be using it for, you know, KBV2. in that situation. What's that?

**Benjamin Howard 4:29**
Specify, so specify what, so specify when they give the number, specify what secret that is from.

**Sara Snowden 4:39**
So my thing is I don't think they're going to necessarily know. We hope that they would, but they wouldn't necessarily know. Because getting data, like I was telling you the other day, getting data out of vault is really oddly difficult.

**Benjamin Howard 4:44**
Okay. Yeah, so it's going to be able to give us, you know, some directional information, but really not as granular as we like, even if they have it.

**Sara Snowden 4:54**
Yeah. Yeah. Yeah.

**Benjamin Howard 5:05**
OK.

**Sara Snowden 5:11**
So I don't know. And you might want to... We can refine the questions as much as possible, but after like one or two conversations, you might need to see like how the questions might need to pivot. Because if we can get at least an understanding of how the customers are using Vault, like a better understanding, right? Maybe what some of their workflows look like.

**Benjamin Howard 5:25**
Yeah.

**Sara Snowden 5:36**
you know, they're using machine to machine off to run this thing and they've got maybe they'll know 20 developers run that thing so that we can kind of abstract from that what their usage pattern would look like.

**Benjamin Howard 5:51**
Mhm.

**Sara Snowden 5:53**
But it's kind of going to be a bit of a long shot there. Worth asking the question, because I could be wrong, and some of them, you know, some folks might actually really, really have a good grasp of volume.

**Benjamin Howard 5:56**
Yeah. Yeah.

**Sara Snowden 6:06**
It's, I would find it very shocking though.

**Benjamin Howard 6:10**
Okoh.

**Sara Snowden 6:11**
Um, for busy, okay.

**Benjamin Howard 6:12**
So. I do believe I have some of that covered in those top questions, like the, you know, qualitative ones, but we can double check and then I could add those in if they're missing, but I feel that they are there. All right, so what about this section?

**Sara Snowden 6:23**
Okay.

**Benjamin Howard 6:34**
basically the authentication rate at peak, understanding like the logins, and this is the purpose of this question was to understand like the human entity component of it, of like how many jobs are being taken, like how many tokens are being renewed, just things like that, kind of Basically, the workload and understanding, like the capacity load of this is associated with it.

**Sara Snowden 6:59**
This is a, this one you actually might get a better vibe from, especially around the steady or spiky. Because if it's spiky, that customer could have run into issues and then that person would have had to help them set rate limits and quotas and stuff like that. So this one actually might get you some good insights. That's a really good question to ask.

**Benjamin Howard 7:06**
The. Mhm.

**Sara Snowden 7:18**
Because that will help us understand too, do we need to allocate a lot of extra capacity because of XYZ?

**Benjamin Howard 7:25**
Yeah.

**Sara Snowden 7:26**
And we'll need to know in that situation, and I know you'll have it, but we'll want to know, like, if it's spiky, what secrets engine they're referring to. Because that will dictate if it's memory or compute that we're going to run into problems too. But you had already had that context, I believe, by the time you got to that question.

**Benjamin Howard 7:47**
Yeah. Okay. So I feel pretty confident that we'll be able to get that.

**Sara Snowden 7:56**
get something out of that one. More if it's spiky and if they don't have issues of where they know if it's steady or spiky, then it means it's steady because they wouldn't have ran into issues or they've heavily, you know, over-provisioned their instances, so they've got room to spare.

**Benjamin Howard 8:08**
Okoh. Yeah. Yeah, so it's kind of inferred at that point.

**Sara Snowden 8:19**
Mhm.

**Benjamin Howard 8:21**
Okay.

**Sara Snowden 8:21**
Of the heavy features, which one drives most requests or load in your accounts? Okay. Yeah. To the pen.

**Benjamin Howard 8:36**
If it will be able to get that one.

**Sara Snowden 8:42**
Yeah, because that would be them just knowing how their customers are using. the secrets engine and if they're running into issues. So that actually will be helpful. I think you might be able to get some insight there.

**Benjamin Howard 9:00**
K.

**Sara Snowden 9:01**
When you heard from the other recordings, it's very hit or miss, but people may or may not know. Some are fuller details, others are very, I don't know, very not helpful. Not that they're not helpful, it's that it's just not something they know about.

**Benjamin Howard 9:06**
Yeah. Yeah, I still like... Yeah, it's just like they, they have, they have the general knowledge and, you know, or excuse me, in-depth knowledge. It's just like specifics that we need, I think is the is the struggle bus.

**Sara Snowden 9:30**
Mhm.

**Benjamin Howard 9:30**
Okay, let's see. So this is going back into like the load. So this kind of like lumps into this question right here with the steady or spiky. So it's understanding like the scaling aspect of it. When one of these clusters starts to struggle under load, what runs out first? And then, typically, what they're looking for with that.

**Sara Snowden 9:57**
Yeah, that's a really natural continuance of the questions before.

**Benjamin Howard 10:03**
Switch.

**Sara Snowden 10:04**
may not know and it may not need to be clarified because if they're explaining the prior two, you might actually already have this answer. But it's certainly worth just asking.

**Benjamin Howard 10:11**
Mhm. Good.

**Sara Snowden 10:15**
Because yeah, if they don't put it out there, then you can double back and get more granular details.

**Benjamin Howard 10:21**
Okay. And then I included to kind of dive into a little bit more. And this is something they probably won't have access to just because it's a numbers game situation. But this is, you know, If they don't have this information, just kind of inquiring a little bit more about... how that's operating during those moments.

**Sara Snowden 10:43**
They, are you looking, are you talking about Q7?

**Benjamin Howard 10:47**
Uh, so on the probe.

**Sara Snowden 10:49**
Okay, the key 6.

**Benjamin Howard 10:50**
So, if they don't... Yeah, so on the Q6 probe right here.

**Sara Snowden 10:53**
Yeah. Yeah, they're not going to have the peak concurrency at the time. They definitely wouldn't have storage info. I wouldn't think. That would be obscure if they did know it. So, they may or may. I would say it's pretty unlikely that they're going to know.

**Benjamin Howard 11:18**
Okay.

**Sara Snowden 11:18**
It would be great if they did, but I think it'd be really unlikely. It would almost actually, on the probe, I actually kind of wonder.

**Benjamin Howard 11:28**
So, numbers.

**Sara Snowden 11:42**
It might be worth asking if they have a high level understanding of their architecture, because like, are they using OpenShift? Are they running a three node cluster? Are they running like a five node cluster? Um, because that would kind of tell you a little bit of... Capacity. So there might be something in that realm to, and I don't know if it's at this spot in the questioning, but that makes me think. That might be a nice indicator. Because if they have like a five-load cluster, they shouldn't be running out of capacity ever, right?

**Benjamin Howard 12:26**
Yeah.

**Sara Snowden 12:29**
If they're running on OpenShift, they should have more flexibility. If they're running on like bare metal VMs, it's just a different world. And that might also be an indicator of why they run into problems. So that might be a good idea to ask about.

**Benjamin Howard 12:37**
Mm. Yeah.

**Sara Snowden 12:50**
And it will help us actually down the road because the ones who are using like OpenShift, like that's going to be a helpful little nugget because of some stuff we might do in future iterations of this journey. So, I would, I would, I would ask about that, pull that one in.

**Benjamin Howard 13:10**
Okay, so Le.

**Sara Snowden 13:12**
Okay, the Q7, you actually would probably get very good information on this. In every, like, involved, if you talk to engineers, like when there's a major customer event, everybody knows about it, still knows about it, and still talks about it every time there's a problem, because we'll all compare it to that one event.

**Benjamin Howard 13:29**
Mhm.

**Sara Snowden 13:29**
So 7's a killer question. Because the the SEs would know about it. When customer outgrows are set up, that's right, move. That's a really good question to ask. We know the answers and we know some of that from like the validated designs, but then how it happens in real life.

**Benjamin Howard 14:01**
So, are any of these?

**Sara Snowden 14:04**
The grounding's not going to help you, by the way. That's for the stuff underlying how we're running it. So we'll have multiple clusters on a worker node. That's like our underlying platform stuff, not what the customer would have.

**Benjamin Howard 14:10**
Mhm. and should, and I think with this question here. Um, students question here, it's kind of like leading and understanding, so... When they're talking about the architecture. we will get a sense of, you know, are they running on-prem or bare metal? And so we'll kind of probe that. And then basically how I can get that information to subsidize these questions is asking them, what is it typically running on? So is there a requirement? to be running on one or the other.

**Sara Snowden 15:06**
So no, they can run it on, I mean, they're on-prem, all these customers can be on-prem. And actually I did hear that there is like 1 customer on cloud and I don't know how they're running on cloud because it is a federal division. But anyways, we can actually get good data on that one. But.

**Benjamin Howard 15:21**
Yeah.

**Sara Snowden 15:26**
So A self-managed customer, all these customers are going to be self-managed. They're going to be running it in their data centers. It's possible they're running it on OpenShift. It's possible they're running it on bare metal like VMs. It's possible they're running it on straight VMs, like with Windows or... you know, whatever. So there's a number of different ways they could have it deployed. Typically it's deployed in containers using Kubernetes, but you never know, people might have different needs because they are in, the federal customers are in unique environments, you know, with.

**Benjamin Howard 15:46**
Yeah. Mm.

**Sara Snowden 16:05**
their internet's not the same as what we do. Maybe they've got a fully contained, they're hosting on public cloud in a fully isolated, you know, air-gapped manner. I don't know what it looks like. So just kind of getting a sense of what their architecture is.

**Benjamin Howard 16:08**
Yeah.

**Sara Snowden 16:24**
or deployment strategy looks like in general might be super informative. And that actually ties beautifully into your question 8. So when they outgrow their setup. So you could ask, what does their setup look like? And then what does it look like when they outgrow it? You know, how are they handling it? Because it's possible that customer has already scaled up. They've already had to. add additional clusters and namespaces or had to add a, you know, VPC. I only know the cloud world, so I'm not very helpful on the self-managed side of the house. I haven't touched self-managed, just like local data centers in forever. But those questions would pair perfectly together.

**Benjamin Howard 17:07**
Okay, that's good. I want to add that in.

**Sara Snowden 17:10**
And even if it doesn't help us with like the limits project that we're working on, this will be very helpful information as far as us understanding how the customers operate, because future solutions that we want to build are going to be very tied into what does their architecture look like now, because I want to find ways to...

**Benjamin Howard 17:29**
Mhm.

**Sara Snowden 17:30**
copy that in a way and emulate it in cloud so that they have like awesome like test, you know, harnesses there. Okay.

**Benjamin Howard 17:39**
Yeah, no, that makes sense.

**Sara Snowden 17:41**
Across the federal counts you've seen, how concentrated is demand? Was going to drop the same size or... Three.

**Benjamin Howard 17:52**
Basically, who's the largest kind of like...

**Sara Snowden 17:52**
Mhm. Who's the big dog?

**Benjamin Howard 17:56**
Yeah, and then what is their what is their organization look like? And that the purpose of that question was really, you know, all these centered around the limits, but really understanding like our highs and lows, because we want to be able to create solutions that are going to be And I know you said like not tiers, but when we kind of think about it, you want to be able to have solutions based on those different limit sizes. Like what does a large look like? What does a medium look like? What does a small look like? Yeah, exactly.

**Sara Snowden 18:30**
Yeah, we need to find the happy medium for sure. Yeah, and I did want to just comment on the tiers, because tiers is what we do have that in public cloud now, in our cloud, bulk cloud solution now. So that's why we're shifting away from that with at least this, because it'll just be a standard.

**Benjamin Howard 18:42**
Mm-hmm.

**Sara Snowden 18:50**
But yeah, we need to solve for the common denominators. We don't want to solve for the outliers, the ginormous one versus the itsy-bitsy one getting started. You know, I need to kind of have that happy medium. So that's a really good question to ask. The question 10, I asked Dan about that.

**Benjamin Howard 18:56**
Yeah. Mhm.

**Sara Snowden 19:08**
pretty recently, so Dan's not going to give a unique answer to what we already really know. And that one actually was really interesting to me because typically it takes a really long time to onboard onto Vault. Because of the, he was basically saying because like the federal procurement cycles are pretty slow, that a lot of times customers come in like hot, ready to rock. That's not every case because there are scenarios where agencies need, you know, their shared services department to help with a lot of the setup stuff and then they have to wait in the queue and blah, blah, blah. So. Um...

**Benjamin Howard 19:48**
Okoh. One of the key things with this.

**Sara Snowden 19:50**
We have asked questions around that.

**Benjamin Howard 19:52**
One of the key things with this question that I thought about too was from my previous experience in cloud and with Like when people, when it was time to upgrade clusters, there was a lot of hesitation to upgrade the clusters because it was primarily running on a CLI. And people found that the CLI to be really not reliable, really not dependable. And so that's why we switched from a command line interface to a UI in order to do that. But one of the things that people talked about, you know, outside of the issues with it not being a reliable upgrade process was the fact that there was not a lot of onboarding documentation that existed. So this question is kind of meant to put like to draw out that information to see if there's

**Sara Snowden 20:37**
It.

**Benjamin Howard 20:41**
aspects of our process that we can improve in order to expedite the flow of that in order to make it easier to upgrade, or to not upgrade, but to onboard.

**Sara Snowden 20:51**
Our onboarding process is notoriously awful because Vault is so complicated, because it addresses so many different scenarios. So they made it very, I want to say elastic, even though I don't want to use, you know, Amazon's elastic terminology because I despise it.

**Benjamin Howard 20:54**
Yeah. Yeah. Hey.

**Sara Snowden 21:12**
But it is. You can use Vault in so many different ways. So there are some things we put opinionated patterns out about, and that stuff you'll find in the validated designs. But Vault is notoriously difficult to get up and running. Very few people actually use our UI, and I think because it's so awful. I only use the UI. Everybody else around here uses the CLI, but I don't do that. It's not my jam. So I'll be interested to hear what feedback you get there, but...

**Benjamin Howard 21:35**
Yeah.

**Sara Snowden 21:49**
Onboarding issues is a known problem with vault from a vault binary vault self-managed perspective, and it's the same issue with the cloud. We do a lot of the heavy lifting for the cloud, but it's still difficult for customers to get everything connected in, so...

**Benjamin Howard 22:00**
Yeah. Mhm.

**Sara Snowden 22:08**
You'll probably hear stuff we know a lot, but it would be good to see what that is from the federal perspective specifically. But it's a known issue. They are making improvements, but it's a known problem.

**Benjamin Howard 22:21**
Yeah. Ogle.

**Sara Snowden 22:25**
Okay, reliability. And we've got 6 minutes left. I've got a meeting right after this.

**Benjamin Howard 22:31**
Get it there, we got it, we got this. There's only three more questions, four more questions left.

**Sara Snowden 22:32**
Yeah. What availability? OK, expect OK.

**Benjamin Howard 22:38**
Um...

**Sara Snowden 22:45**
Yep. Um... Okay, the probe would be interesting. I don't expect any issues because West Region from East Region is not really going to introduce much latency. It's really only real latency if you're trying to like hit Europe, you know, from a US based thing. But it would be interesting to see. One thing that is I found interesting.

**Benjamin Howard 23:03**
Okay.

**Sara Snowden 23:14**
GovCloud's never had an outage, or at least GovCloud East had never had like an outage outage, which is shocking. Apps of course have, right? But just AWS GovCloud East hasn't had a like outage outage, which is shocking.

**Benjamin Howard 23:18**
Oh. Yeah. Yeah, that's what I was just about to say, ask us what it was running on. You said AWS. Okay, that's interesting.

**Sara Snowden 23:36**
No. So, we'll see what you get from that. What federal customers, states having, or low north compared to what they actually run in production?

**Benjamin Howard 23:40**
Yeah.

**Sara Snowden 23:47**
Yeah. That'll be interesting to see. And it's possible they may or may not have that information.

**Benjamin Howard 23:55**
Yeah.

**Sara Snowden 23:59**
That'll be curious to see what you get out of that. Because there are RFPs, the government ones are weird, because it's like you first have to like bid to get the ability to bid type of thing. And then, yeah, it's a weird dog and pony show. But the field would actually probably have some very good and helpful insights on that. Because I would guess that the conversations that they have.

**Benjamin Howard 24:10**
Mhm.

**Sara Snowden 24:21**
and the work they have with clients is very different than what's in the paperwork, because the paperwork has to follow those strict, you know, ways of how it's done, which makes no sense to me. It's not like commercial at all to me.

**Benjamin Howard 24:25**
Yeah. Okay.

**Sara Snowden 24:36**
Okay, in the next couple quarters, what's the thing most likely to be better walk away on day one? What they can they live without? Hold on, versus...

**Benjamin Howard 24:49**
So this is like, hey, we need better onboarding. We need UI, we need these different type of tiers. We need, you know, as TJ pointed out, the different type of like levels. We were like, yeah, we need to operate in our own like name spaces and everything. Like what is, what does that look like?

**Sara Snowden 25:06**
You can probably hear they don't care, they just need a FedRAMP cloud version. But you never know. I'd actually be curious to see with it being open like that, what you hear back. And we should have probably done that last fall. Ask those questions last fall. Okay, you know a few groups, have users come up.

**Benjamin Howard 25:18**
That.

**Sara Snowden 25:27**
Yes, you do. I'm not sure what you'd get out of 14, but because it's so open, you might get some interesting tidbits out of that. And a lot of times for context too, the field folks are very dedicated to 1 customer, so they're only going to know that one customer.

**Benjamin Howard 25:45**
Sweeties. Okay.

**Sara Snowden 25:53**
They may know of others in a similar space, so it would be interesting to hear what you get. I wouldn't see change it or anything. I would just say, you know, pre-warn you that you might not get.

**Benjamin Howard 26:05**
Griffin.

**Sara Snowden 26:11**
a ton of variety, but you might get them to open up about just more insights about how their customers are using Vault.

**Benjamin Howard 26:19**
Okay. So, I think we got...

**Sara Snowden 26:31**
I think, yeah, I think this is looking pretty good. And just, you know, don't be disappointed or discouraged if you get crappy answers on some of these, because honestly, every little tidbit we understand better will make us more informed and help us build towards making better decisions, or at least doing what we can.

**Benjamin Howard 26:33**
Yeah. Yeah. Mhm. Yeah, what I'll do now, I'll go ahead and rework this a little bit to prioritize. The questions, I think we're pretty good. I just kind of removed some stuff. I'll get the script updated with all the things that we kind of talked about. And then I'll Develop a. A kind of a research. Oh my gosh, I'm brain farting right now. Sorry. Schedule. So ideally we can shoot for picking up the research. If we can start, what I'll do is get an email template to you and then we can, you can forward those to your sources and it'll be from me and and you and say, hey, this is who we are, this is what we're conducting, this is why we're conducting this, and then get the availability.

**Sara Snowden 27:40**
I can just hit some folks up. We won't have to be that formal about it. Our field's used to us peppering them with questions. So a couple people will have to do it because that's a big part of their job is working with us. And they'll be like, you're Tim Wilson, who's the one who is pushing for us to do this the most.

**Benjamin Howard 27:45**
Okay. Yeah. Yeah.

**Sara Snowden 28:00**
Tim Silk will help us, who's TO's Tim Olson's boss. And then Dan is the federal CTO, field CTO, so he has to help too. That's, they're our partners in crime. You gotta help.

**Benjamin Howard 28:15**
So, whether you like it or not, you're gonna help.

**Sara Snowden 28:20**
And so we can, and they'll tell us who else will help us too. So they'll give us some good folks to talk to. So we don't have to do anything that formal. We can get it running quickly.

**Benjamin Howard 28:24**
Okay. Yeah, so I would say let's kick it off. I get back on the 17th. And so, and then I'm going to take the 19th off. So really we can kick it off and I'm good with stacking. stacking as many as I can so we can do like 3 in a day if need be. Ideally I'm looking for...

**Sara Snowden 28:51**
Like, what days are you talking about? June?

**Benjamin Howard 28:54**
So the week of, yeah, the week of, if we can get somebody scheduled in for like... the 18th, that would be great, you know, our first little batch. And then that gives us an opportunity. So if we can get like one on the 18th, that gives me an opportunity to get through that one and see what things need to be refined. I always, that's how I like to do research is do like 1 tester and then refine them. And then we can get everybody scheduled in for that following week.

**Sara Snowden 29:18**
Yeah. And then that was what date?

**Benjamin Howard 29:26**
On the 18th of June, conducting one interview.

**Sara Snowden 29:28**
Right, one, and then the other date.

**Benjamin Howard 29:32**
starting on that 22nd of June, running all the way through the 26th. And we can stack three a day if we need. Typically speaking, I would say we need about 5:00 to 8:00. Ideally, I would like to get like 10. Okay.

**Sara Snowden 29:45**
We may not have that many. We may not have that many. But we should be able to get a few, which will at least help feed this. I've got a gym to my other meeting. I will get some recruits on the line.

**Benjamin Howard 29:55**
Okay. Right, sounds great. All right, you got this. Get through the week. Bye, Sara.

**Sara Snowden 30:04**
Thank you. I hope so. Bye.

Benjamin Howard stopped transcription
