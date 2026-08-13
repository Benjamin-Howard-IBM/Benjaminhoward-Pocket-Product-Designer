HVD Q3 planning and transition-20260805_143624-Meeting Recording

August 5, 2026, 6:36PM

20m 1s

Benjamin Howard started transcription

Benjamin Howard   0:06
Alright, good to go. And then I think you just have to share the screen again.

Luis Guzman   0:12
There you go. Oh yeah.

Dante Okoh   0:32
Okay, so E readiness, Gateway and Azure program will be the ones who will likely need design. There's already a design that was previously done for Gateway, so we probably need to look into that one, pick it up from there. Right, but it's uh, yeah. Then, as your parent, you need to speak with the Gesh. Gesh is the one handling that project, so he works on me, and then what else? Why then the data residency one? I'm not sure there's a design needed, but engineering team is looking into that one. In particular. Not from Dante. Yeah.

Luis Guzman   1:24
Um...

Dante Okoh   1:25
The couple Azure Private Link regions also. You need to... Look into that one. Where do you have Azure Private Link, right? We are bringing the Azure Private Link UI into this quarter. I think it's one of the things Kamil needs to finish up. So we have a crude flow for the Azure Private Link, sorry, AWS Private Link UI. So he's already looking into it, so he just needs to clean up anything that is needed. I think that also falls into the decouple Azure private link if there's any action item there.

Luis Guzman   2:05
So, there's three things Kamil should be working on.

Dante Okoh   2:09
Yeah, yeah, so this one, the third one, there's probably nothing, but it's related to the two six, so six and seven are more integrated than it, so yeah.

Luis Guzman   2:23
Do you think is the scope for one and two like big enough? That. They can occupy a designer for an entire quarter.

Dante Okoh   2:35
Well, I would say they are big enough for that, but we do have things that will come up in a quarter. So I've been told recently that there is an agentic... release that's going to come up. I don't know what's going to happen there, but I was just told that on Monday, so there's probably something there as well. So some of these things probably come up. So we would have things for at least in Q3 that needs to be done. So at the top of this list would be Azure Private Link, Gateway and the Agent QI.

Luis Guzman   2:53
Mm. Mhm.

Dante Okoh   3:10
And your thing will be basically as the as we discovered.

Luis Guzman   3:15
Is this different from a Azure Private Link?

Dante Okoh   3:20
Yes, this is very different, so...

Luis Guzman   3:22
OK, so we need a note.

Dante Okoh   3:31
Azure Private Link is also on the list, but it's more or less replicating what we have for AWS Private Link, so not sure the mother of work needed that, but yeah.

Luis Guzman   3:41
Mhm.

Dante Okoh   3:53
The question is...

Benjamin Howard   3:53
With those top.

Dante Okoh   3:55
Yeah, go ahead.

Benjamin Howard   3:55
I'm sorry, go ahead, go ahead, Dante.

Dante Okoh   3:58
The question, is there an agentic angle for HVD? The answer is yes. It's just that we're not picking it up to Q4, basically. All right, so it's going to be released on self-managed first, similar to use case consumption, and then HVDU. Yeah.

Luis Guzman   4:07
M. Do you think this means that design could start earlier? Or does it need?

Dante Okoh   4:20
I honestly do not know because I just got the information on Monday, so I actually do not know the note.

Luis Guzman   4:27
This one? Okay.

Dante Okoh   4:29
Yeah.

Benjamin Howard   4:33
And then Kamil, are you the POC for the previous design work for gateways?

Kamil Zal   4:45
So that design, I have a link to the design that was done, I think like 7-8 months ago.

Luis Guzman   4:53
I think that was Shana.

Kamil Zal   4:55
Yeah, I think you're right, yeah. So yeah, I'm going to share this with you. We can go through what's there and how to start it. Definitely the design needs some rethinking how we're going to represent, you know, connections there.

Benjamin Howard   4:57
Okay.

Kamil Zal   5:13
Because it was like a, I don't think so we had a component for this in Helios. There is a component that Carbon has it, but you probably need to create like a custom design for this because we cannot like pull the component from Carbon. Into that.

Benjamin Howard   5:36
So, so yeah, this is all through Helios, not carbon, correct?

Kamil Zal   5:43
Yeah, you'll be working with Helios, yeah.

Benjamin Howard   5:45
Okay. And then for one and two, there has been no previous design work conducted on that. Is that correct?

Dante Okoh   5:54
So for one, where do you have AWS private link, sorry, Azure private link, so the design is should be fairly the same, right?

Benjamin Howard   6:03
Mhm.

Luis Guzman   6:11
Or.

Benjamin Howard   6:11
And then pairing.

Dante Okoh   6:13
Yeah, there is no design. So we already have some peering functionalities on HVD. So you just need to take a look at what we have there. And then this is more of supporting V1 for Azure customers on what we already have today. So.

Benjamin Howard   6:31
OK, and then for all three. What stages of planning are they in? So like, has the documentation been written up? And, you know, we can go over getting all of that if so. And then what refinements need to happen in terms of like requirements?

Dante Okoh   6:54
So for gateway, there have been documentation. That's why there's an initial UI. So there have been documentation. For Azure Parent, I think there's a new documentation. You can speak to Durgesh about that. Sorry, for Azure Parent, for Azure Private Link, where do you have documentation for AWS Private Link? So, it's more Leslie.

Benjamin Howard   7:17
Mhm. Yeah, it's kind of similar. Gotcha. And then do we have... timelines associated with each one of the projects as well.

Dante Okoh   7:30
So the only ones that I can say for certain is for the agentic one, which we are still yet to be decided needs to be done in Q4. That's certain, right? So this is a more management than anything else. For the Azure Private Link as well, Q4 is the, sorry, Azure peering, Q4 is the tentative timeline. For the other two, right, we just need to the other two gateway Q4 also, depending on our capacity, then Azure Private View comes into play, right? So right now it's just still dependent on capacity.

Luis Guzman   8:15
Dante, do you mean engineering work is done in Q4? Feature is ready to be released in Q4.

Dante Okoh   8:21
Yes, so for #4, that one is certain we definitely need to give in Q4. For #3, level of engineering work has actually already started, so the UI is stuff like a blocker in that sense for gateway. Then the Azure operating. Here, when we're doing discovery this quarter, and then more implementation from next quarter. The Azure private link itself, it most likely going to be discovered next quarter, but it still depends on capacity.

Luis Guzman   9:01
And then the GCP project, you said.

Dante Okoh   9:04
Yeah, this is... politics. So we're trying to negotiate our way with the IBM team because it heavily involves the HTP team. Right, so that's where that is at the moment.

Luis Guzman   9:22
To do it or to not do it?

Dante Okoh   9:24
To do it. So they are saying that they have a lot of things on their plate. We are saying we have more dollars attached to it than anything else, so why not include, like I said, politics. So we'll see how that turns out.

Luis Guzman   9:40
Guide. Um... I think we arranged these. These 3, ideally, design work gets done in Q3 so that you're free to build in Q4. Is that, is that right?

Dante Okoh   10:03
But if that's done, I don't mind that.

Luis Guzman   10:06
Sure, let's say that. Design. Um... And that these two, well... You tell me. Also, I suppose, need to be done by Q3.

Dante Okoh   10:26
Yeah, which to? Agentic Phone 5. So the...

Luis Guzman   10:29
Four and five.

Dante Okoh   10:35
Four and five, the four one, like I said, there's a lot of politics to go in there, so I'm literally just waiting. We've put a lot of business cases into place, so it's more about my table than anything else. So, CBD. But #5, It definitely, so even if nothing happens in Q4, number 5 is going to happen, right? So they are pushing for it to happen in Q3, but we don't, it's coming middle of the quarter and we don't have the capacity, right? So it's just literally coming since Monday.

Luis Guzman   11:12
But scope is like...

Dante Okoh   11:14
Yeah, so it's going to be released in the next major version of self-managed then.

Luis Guzman   11:15
On up.

Dante Okoh   11:21
Um, HVD is going to pick it up, basically.

Luis Guzman   11:25
I think what I know they worked on is agent registry.

Dante Okoh   11:30
I think they are two things, so I think agent registry and something else. Hold on, so the agent registry and something about auth method, I guess. So, but like I said, I got this on Monday and I'm just getting back today, so I was off Monday, Tuesday, so still catching up.

Luis Guzman   11:49
M. Got it. Okay, cool. Question for you, Kamil. Can you comfortably finish these or like balancing this and runtime for the rest of Q3?

Kamil Zal   12:11
Yeah, that should be absolutely fine. I spoke with Dante about this and I was like, I can definitely balance and have this done.

Luis Guzman   12:22
Gupta. Oh, Dante, if I told you that theoretically that Benjamin is complete, is can devote 100% of his time to HVD next week, which is not true because he has some other stuff to do, but imagine that it was true. Would you be ready to, either you or Durgesh or someone from your team ready to start working with Benjamin?

Kamil Zal   12:38
The.

Dante Okoh   12:46
Yeah, I think the closest one would be the Azure Perry one. Yeah, I think Durgesh put together, I think a memo of PRDR itself. I want to speak with him, so that would be the closest one. Secret inventory button, I don't think there's a UI needed there. EU readiness.

Luis Guzman   13:05
Yeah.

Dante Okoh   13:12
I also don't think there's a URL needed there. See, but yeah, so I think that's the closest one, so yeah, Durgesh can probably start working again on that bit gateway as well. I think we gateway. The engineering team, but probably not be able to respond till like later in the month, so that's a lot we dedicating, so we had to move capacity for gateway into something else more critical, so it's becoming a stretch for this quarter, but... We already done a POC on a demo with the customer, so you are more or less the next step.

Luis Guzman   13:59
Got it. Is this, are these four actually all of them Durgesh?

Dante Okoh   14:04
No, so the gateway will be me. Yeah, it will be me. Azure Private Link will be me as well. The agentic one will also be me, so it's just the Azure Private Link. A show, a show pairing that would be Durgesh.

Luis Guzman   14:23
Yeah, I got him, and then this one would be you as well.

Dante Okoh   14:26
Yeah. Yeah, so I would say if you wanted to start, the major focus would be the Azure Private Link and then look into Gateway. So we already have the designs for Gateway is more of picking up from where that left off for the most part. And the agentic one, I need to dig into it a bit more. Ahmed. Yeah, so more of a discovery from my point of view than anything else.

Luis Guzman   15:05
Got it.

Benjamin Howard   15:05
So what we can do is set up some time, you and I next week, to go over the go over the private link in the gateway, and then I can touch base for the peering as well.

Dante Okoh   15:22
Yeah, so for the gate for the private link, I'll say, look, look at what we've done for the for the AWS private link, like it's literally the same thing.

Benjamin Howard   15:33
Hey, Kamil, are you the owner for that?

Kamil Zal   15:39
Well, I didn't start it, but yeah, for a private link, yeah.

Benjamin Howard   15:43
Okay, so I'll set up, so I think what I'll do next week, I'll set up time with Kamil first, Dante, before we connect, so then I can start downloading some of this information and knowledge. And then that way, when you and I meet, I could have just a better base of understanding so that I know what questions that be asking you and kind of what information came from there.

Dante Okoh   16:07
Sounds good.

Luis Guzman   16:11
All right. How much of your time are you spending on, or like what do you think the research work for you, Benjamin, looks like? This is outside of HP. Benjamin has his background, his half research, half design, so he's been helping out Kirsten on a lot of research stuff. And he might spend some of his time there too, but I think it would benefit everyone at the end.

Kamil Zal   16:23
Right.

Dante Okoh   16:32
And. Who is Kristin?

Benjamin Howard   16:34
Yes.

Luis Guzman   16:36
Kristin is our research manager on anything about, yeah.

Dante Okoh   16:40
Okoh.

Benjamin Howard   16:42
So, I'll know.

Luis Guzman   16:42
Uh, how?

Benjamin Howard   16:45
Yeah, I'll know a little bit more tomorrow. We're meeting towards the end of the day tomorrow. And so I'll be presenting to her the product design UX hub. And so from there, we'll start seeing which templates she has, matching those with which templates I have, and that'll be the first crack at that. And then I'll be able to tackle. One or two like research projects. But the bulk of what we want to do, a helper out is, is the establishment of research ops first. So I think we have a lot of that done already, but I'll know a lot more tomorrow. And then I can give you kind of a timeline blocks of everything.

Luis Guzman   17:30
Got it.

Benjamin Howard   17:31
The MCSP work is pretty much done. We had a couple meetings yesterday and then today, so minor design changes keep coming through because of new requirements that keep getting flushed down, but they're nothing drastic. That's taking me a significant time. So it's just me adding certain pages and things like that. So that's not the biggest issue right there. But I have, like I said, more of an idea tomorrow on the research front, and then we can start allocating like time blocks.

Luis Guzman   18:07
Got it. Do you mind when you worked on cloud stuff? I think, can you can you tell Dante about your background in cloud?

Benjamin Howard   18:15
Yeah, so starting off first, I'm at Google. I was on Anthos. Changing from, you know, CLIs to UIs, working with on-prem, vSphere and everything. And so then that's why the background for MCSP came in as well and being able to work on that. So a lot of experience with the cloud, with cloud base. And then also at AWS, I was on the marketplace team dealing with cloud-related matters in marketplace as well.

Dante Okoh   18:53
Sounds good.

Benjamin Howard   18:54
Yeah, so we should should be a very easy learning curve with this.

Luis Guzman   19:02
Great. Any questions? Any lingering questions?

Dante Okoh   19:03
And. I don't personally have any, I guess. Yeah, I don't have any questions, yeah.

Luis Guzman   19:21
Good meeting then.

Benjamin Howard   19:23
Yeah.

Luis Guzman   19:23
We're aligned.

Benjamin Howard   19:25
Yeah, and so I'll be on vacation and I have it on my calendar and start blocking out on the 7th through the 10th coming back on that Tuesday. And so as soon as I get back, that's when I'll start getting the time set up.

Dante Okoh   19:34
Pizza. Yeah, I'll also probably be off the first two weeks of September, so... Yeah.

Benjamin Howard   19:46
Right, perfect. So yeah, I'll start setting up those meetings for next week and then I look forward to working with you.

Dante Okoh   19:53
Yeah, you too.

Luis Guzman   19:55
Great. Thank you, everyone.

Dante Okoh   19:56
All right.

Benjamin Howard   19:57
Everyone.

Kamil Zal   19:58
Thank you, guys.

Benjamin Howard stopped transcription
