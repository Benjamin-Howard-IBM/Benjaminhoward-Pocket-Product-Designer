# MCSP Discussion

**Participants:** Benjamin Howard, Sara Snowden
**Duration:** ~25 minutes
**Source:** `MCSP discussion.vtt`

---

## Transcript

**[00:00:03] Benjamin Howard:** back up. K.

**[00:00:09] Sara Snowden:** I wish there could just be a blanket acceptance, like you do it once a week or once a month.

**[00:00:15] Benjamin Howard:** Right? I don't know why it does that. And it's just like everybody does this and then everyone has to come back on the camera. It's just, yeah, it is not worth it.

**[00:00:22] Sara Snowden:** And so many people don't come back on and then you know they're off multitasking.

**[00:00:24] Benjamin Howard:** Yeah. I've definitely done that before too. So, yeah. Okay, so I've had an opportunity to look at the deck you sent over. Thank you for sending over that. And then have started diving into the FedRep document as well.

**[00:00:31] Sara Snowden:** Definitely guilty.

**[00:00:45] Benjamin Howard:** So kind of want to start from the beginning, kind of essentially what we talked about initially during that first meeting. If you could just give me a rundown of the requirements and everything of what we're asking for for both projects. And then I'll ask a couple of questions from there as well.

**[00:01:06] Sara Snowden:** Narrow the scope down a little bit more because this can start from 100 different directions. Are we talking about the specific project or are we start like the specific we need to find out this data point and determine these limits like that part of the project or are we talking about MCSP more broadly?

**[00:01:11] Benjamin Howard:** Yeah.

**[00:01:21] Benjamin Howard:** Yep, so just the project first on both levels, but the analytics and then finding the limits and information. So we'll start there. And then from there, then we could dive a little bit into more of the specifics of the project, but we'll start at the high levels for both.

**[00:01:30] Sara Snowden:** Yeah.

**[00:01:41] Sara Snowden:** Okay, so for, and the two are kind of related and overlapping, right? The two different areas. So for software, you have to determine what your limits are, what you're telling customers you can do. A customer can't come in and put a million secrets in to vaults.

**[00:02:00] Sara Snowden:** without us having to need to increase our machine size, our underlying infrastructure. So we have to kind of set some parameters as far as, you know, these are the things that you can do. And so if they need to go above that, absolutely no problem. It just means that we're going to have to either have another cluster created for them and they would pay for that.

**[00:02:20] Sara Snowden:** Or if it's a small amount, you know, we could just, you know, perhaps allocate additional capacity to it. And that's just kind of the secrets use case. We need to do that for kind of everything as far as what we can support. So, and I can send you an example of like HVD. Actually, there's a slide in there where I copied some of the HVD limits down.

**[00:02:43] Sara Snowden:** So HVD is HashiCorp Vault dedicated, that's Vault version. It's a hosted cloud version just like what we're doing, except it's on the HashiCorp Cloud Platform, HCP. And what we're doing is we're rebuilding Vault to run on the multi-cloud software platform, IBM's overarching platform, but it's not like our platform where HCP does a lot of the features and functions and the things that like all products need, like license management and billing and like all of those things. MCSP does very small parts or gives you some tools so you can go do those things, but we effectively have to rebuild everything. So with that, we have to figure out how does our software run? What can customers do on it? And does that all kind of match with their expectations?

**[00:03:42] Sara Snowden:** you know, customers expect they can do X, Y, Z, and does it meet their needs.

**[00:03:46] Benjamin Howard:** And we say...

**[00:03:48] Benjamin Howard:** And we say, how does our software run? Are you talking about how does HCP run or how MCSP runs? Okay.

**[00:03:54] Sara Snowden:** MCSP run. So HCP has already figured all of this out, so I can use them as kind of a, you know, just a validation point. One of the complaints we get with HVD is it's not as enterprise ready as many customers want or expect.

**[00:04:13] Sara Snowden:** Because some of our customers, not a ton, but some of them were our enterprise or self-managed customers, and they had Vault running in their own data center with their own infrastructure set up, and so they could do as much as they wanted, because they would just add machine, add capacity, and go about their day.

**[00:04:32] Sara Snowden:** In A managed service environment, you only have so much capacity. You can only have so many connections. You can only have so many things because there are physical limits that AWS has or maybe OpenShift has. Because we are running vaults on OpenShift.

**[00:04:52] Sara Snowden:** powered by Kubernetes and on top of the MCSP platform on top of AWS. So, you know, we've got multiple layers of just dependencies, right? So we have to make sure that Vault runs to efficiently enough to meet those customers' expectations and their requirements. And we need to make sure that...

**[00:05:19] Sara Snowden:** We need to basically make sure that we're at the right instance sizing, so how much compute and how much RAM we're allocating to each customer cluster. We need to make sure what we have now, which was our first kind of take at it, meets their need, or if not, we need to increase it.

**[00:05:38] Sara Snowden:** And then if we have to increase it, then there's some upstream things like, okay, we can only fit this many, you know, customers on this size of VM. Otherwise, we have to increase our sizes and what are our limits. So there's a whole bunch of things around that. So we're looking at things as far as.

**[00:05:59] Sara Snowden:** the networking, looking at what our limits are for what AWS will allow in an environment. We have to look at how many connections we can support because AWS might have a limit, but we could have a slightly different one because of our layers of infrastructure. So a number of things kind of like that. So we're kind of trying to figure out

**[00:06:21] Sara Snowden:** What do we need in order to make sure that we're providing high SLAs and we're providing a wonderful experience for our customers? And then we also need to make sure that we're not provisioning too much because that costs a lot of money and we want to be mindful of our spend.

**[00:06:37] Benjamin Howard:** Mmh.

**[00:06:39] Sara Snowden:** And then, yeah, if AWS doesn't allow it, then, or doesn't allow us to go further, then what are we doing? So we have a number of things we have to figure out around that. So yeah, this is the list that I pulled from online.

**[00:06:50] Benjamin Howard:** Okay.

**[00:06:57] Sara Snowden:** that yeah, HPD has. And we want to at least meet or exceed where they're showing up.

**[00:07:00] Benjamin Howard:** Mhm.

**[00:07:06] Benjamin Howard:** Okay, and so these are kind of the metrics to really start getting an idea about as we think about MCSP. And so if I'm understanding this right, HPP currently runs off of HCP, and we are looking to switch for MCSP, or excuse me, for HVP to run off of MCSP. Is that correct?

**[00:07:34] Sara Snowden:** So HVD is HushCorp Vault dedicated. That's only on HCP. On MCSP, we're actually not HVD because we're not dedicated.

**[00:07:38] Benjamin Howard:** Yeah.

**[00:07:40] Benjamin Howard:** Yep.

**[00:07:42] Sara Snowden:** Even though I use the acronym in everything I wrote for the first like six months. So I was like, wait, no, I have to stop because we're actually on shared infrastructure. So we're just vault.

**[00:07:45] Benjamin Howard:** OK.

**[00:07:55] Sara Snowden:** And then we're not broadcasting the MCSP part of it, but internally we're just saying like MCSP vault or vault on MCSP. But yeah, we're trying to vault on each CP will continue to run. That's our commercial offering. On MCSP, we're focusing on FedRAMP.

**[00:08:05] Benjamin Howard:** Okoh.

**[00:08:16] Sara Snowden:** or federal. And then I'm looking at probably like maybe protected B in Canada next, but focus right now is on federal. There's a lot of challenges of how do we do both and make it clear so sellers know what to sell when.

**[00:08:34] Sara Snowden:** And the call was made to just bypass that for now and just focus on Fed in the MTSP setting.

**[00:08:43] Benjamin Howard:** Kao.

**[00:08:45] Benjamin Howard:** Okay.

**[00:08:45] Sara Snowden:** Long term, we'll end up getting rid of HCP eventually and adopting MCSP. That is the long term executive guidance that's been given. I've put the feelers out or the call out there like, let's wait. We need some advances from the platform before we do that.

**[00:09:09] Benjamin Howard:** Okay, and then some of the things that I think you mentioned previously in terms of like understanding, you know, what are the customers doing and

**[00:09:22] Benjamin Howard:** Like, how many connections do they have? How many apps are hitting vault? And I think part of that that you mentioned is looking at the client customer account and then understanding the difference between like self-managed, like how many people are giving us access versus people not giving us access.

**[00:09:45] Sara Snowden:** So...

**[00:09:48] Sara Snowden:** That one's tricky because self-managed customers don't give us data by default.

**[00:09:53] Benjamin Howard:** Yeah.

**[00:09:53] Sara Snowden:** In HPD, we get data by default because it's a managed service so we can see everything. In enterprise or self-managed, that's in their data centers. So we have no visibility unless they share it with us. So we do have some tooling in there that allows them to just say like click yes and they'll share data, which is how I got this information.

**[00:10:14] Sara Snowden:** So I am using enterprise information or self-managed information and not HPD because the federal customers that we have, our public sector customers that we have, are only on self-managed because we don't have a FedRAMP offering. So we have a couple maybe here and there, but not much on HPD. So I used public sector stuff because it's more important to me to understand what those customers are using and what it looks like because that would be reflective of what they would want to do likely in the cloud space. But I do suspect the information I was able to find in Sigma I don't think that's the full story. I think it's only a piece of the puzzle.

**[00:10:57] Benjamin Howard:** Okay, and so self-managed, as you're referring to public sector, self-managed is related to public sector and HVD is related to enterprise. Or is that the opposite?

**[00:11:10] Sara Snowden:** No, so Vault self-managed is also called Vault Enterprise. To make this really muddy, HVD does run Vault Enterprise, but they don't give customers all of the capabilities of Vault Enterprise because they retain a lot of it in order to do management, right? So we can upgrade their software when they need to upgrade. So we withhold a lot of that for customers. So

**[00:11:45] Sara Snowden:** It's all Vault Enterprise because it's the underlying binary, but the go to market play.

**[00:11:48] Benjamin Howard:** Mhm.

**[00:11:52] Sara Snowden:** Vault Enterprise or Vault Self-Managed can be public sector customers, it can be commercial customers. Public sector is a very small piece of the puzzle, to be transparent. But public sector customers can't be HVD, but they can be Vault Enterprise, and they will be able to be MCSP. Does that make sense?

**[00:12:13] Sara Snowden:** Hi.

**[00:12:14] Benjamin Howard:** It does, yeah.

**[00:12:16] Sara Snowden:** It's clear as mud, by the way, and it took me probably two months before I started getting the difference because people refer to them Vault Cloud, well, that's HVD, or now it's going to also be MCSP. So there's just so many different nuances.

**[00:12:16] Benjamin Howard:** Okay, so that makes a lot of sense.

**[00:12:19] Benjamin Howard:** Yeah.

**[00:12:30] Benjamin Howard:** The.

**[00:12:32] Benjamin Howard:** Yeah, no, that makes sense now.

**[00:12:37] Benjamin Howard:** The Sigma information, I didn't have access to that. Do I simply need to create the account for that? And that was just trying to access it through this link that you had provided here.

**[00:12:48] Sara Snowden:** You'll need to do it through passport.

**[00:12:55] Sara Snowden:** with your HashiCorp email address.

**[00:12:59] Sara Snowden:** Because you have one of those, right?

**[00:13:01] Benjamin Howard:** I do. Now, how is that going to... Yeah, I was going to say, how does that impact going forward?

**[00:13:03] Sara Snowden:** Not for much longer.

**[00:13:08] Sara Snowden:** So emails will be forwarded to us for a while. I don't know what the full plan is, because IBM uses Access Hub for everything, and we don't like that at all. Let me see, I'm trying to grab it.

**[00:13:23] Benjamin Howard:** Yeah.

**[00:13:28] Sara Snowden:** Good Lord, my legs are all messy.

**[00:13:41] Sara Snowden:** Oh, that's why I'm on the wrong thing. Okay. So let's verify my identity. One sec.

**[00:13:49] Benjamin Howard:** Hmm?

**[00:14:01] Sara Snowden:** So I will send you the link for doormat.

**[00:14:09] Sara Snowden:** And you can look up sigma in the...

**[00:14:15] Sara Snowden:** Corporate apps, yeah, in the corporate app section.

**[00:14:25] Benjamin Howard:** And are you sending that on Slack?

**[00:14:27] Sara Snowden:** Yep.

**[00:14:28] Benjamin Howard:** Okay, perfect.

**[00:14:32] Sara Snowden:** Let me take a quick look.

**[00:14:38] Sara Snowden:** Sigma Raul.

**[00:14:57] Sara Snowden:** Think it's Raul.

**[00:15:19] Sara Snowden:** Okay, so I gave you the.

**[00:15:25] Sara Snowden:** what to look up and look for.

**[00:15:28] Benjamin Howard:** Yeah.

**[00:15:29] Benjamin Howard:** Perfect, thank you.

**[00:15:31] Sara Snowden:** Yeah, so that should help you. Sometimes takes a day or two for them to approve it. And that will give you view access. You won't be able to export any of the data. There's Ginger with those licenses. I'm trying to actually get mine back.

**[00:15:46] Sara Snowden:** just because they're expensive. But yeah, they're usually pretty good about improving it. And you can also see who the improvers

**[00:15:52] Benjamin Howard:** Thanks.

**[00:15:52] Sara Snowden:** are and you can also hit them up too.

**[00:15:55] Benjamin Howard:** Okay, perfect. And now in terms of, we kind of discussed timeline a little bit, just kind of an intermediacy, about a month.

**[00:16:07] Benjamin Howard:** In terms of like deliverables or like final like outcomes and what are we looking for in that? Are the specific things that are like need to have, nice to haves, must haves?

**[00:16:22] Sara Snowden:** The big need to have is understanding how many connections. And I gave in that deck just an idea of maybe we could use client counts in this kind of wild *** guess way, which honestly would be very inaccurate, but it would be something.

**[00:16:41] Sara Snowden:** I think the best would be to get a couple RFPs or RFSs. I don't know what they do here or what our team would have, but a couple from public sector customers looking for vault and just seeing what their accounts are. Because anytime I've ever been involved in RFPs, they always have information about the customer's environment.

**[00:17:01] Sara Snowden:** I've tried asking people and you just get very flippant, oh, a couple 100, you know, or these guys have a couple thousand. Well, like I need a little bit more granular than that.

**[00:17:06] Benjamin Howard:** If.

**[00:17:18] Benjamin Howard:** Yes.

**[00:17:21] Benjamin Howard:** Yeah.

**[00:17:22] Sara Snowden:** Understanding the connections is going to have an impact on what our capacity is going to need to look like, what our throughput would need to look like, and what our networking configurations are going to look like. We can put some guesses together around that.

**[00:17:39] Sara Snowden:** but they're really going to be very, very high level unless we understand a little bit more.

**[00:17:47] Sara Snowden:** about the customer behavior. And by the way, these are kind of like my notes because I'm just kind of working through it.

**[00:17:53] Benjamin Howard:** Mhm.

**[00:17:53] Sara Snowden:** So if you look at the slide above, slide 8.

**[00:17:56] Benjamin Howard:** Mhm.

**[00:17:59] Sara Snowden:** Oops, sorry, go down one.

**[00:18:03] Sara Snowden:** Yeah, so I was trying to understand what's impacting what. So the high RAM or memory, we're famous for, you know, having issues with that because so many of our most popular secret engines are very big memory hogs on instances.

**[00:18:22] Sara Snowden:** Compute, I've seen less of that since I've been here last year and change, but there is still definitely demand there. So those are just kind of like my notes. And then HVD, this is how their machines are sized out. The reference architecture represents what Vault Enterprise recommends that customers do.

**[00:18:46] Sara Snowden:** So that was just for some context.

**[00:18:46] Benjamin Howard:** And so...

**[00:18:49] Benjamin Howard:** And when you say connections, are you talking about the connections between each one of these?

**[00:18:54] Sara Snowden:** No, no, no, no, definitely not. Way too complicated. How many machines are hitting fault from a customer? How many users are logging in to set stuff up or do stuff or whatever it is? So in the beginning, you have higher user accounts, lower machine counts.

**[00:18:55] Benjamin Howard:** Or.

**[00:18:58] Benjamin Howard:** Okay.

**[00:19:13] Sara Snowden:** And then over time, it gets more embedded into their workflows. And you'll see very little login and you'll see a lot of machines. But I don't know how many machines would be hitting Vault or how many apps. So it's really how many things are hitting Vault.

**[00:19:32] Sara Snowden:** Ideally on what cadence, but I doubt we could get that level of granularity. That would be golden, but I'm not that optimistic that that would be in an RFP or in someone's head.

**[00:19:45] Benjamin Howard:** Is that?

**[00:19:47] Sara Snowden:** So I would think, I think the most effective manner would be if we could get a couple of those. And it doesn't have to be exhaustive. It doesn't have to be, you know, 10,000. Like if we could get 5 or 10 to scroll through and capture numbers. That would be phenomenal.

**[00:20:08] Benjamin Howard:** Yeah.

**[00:20:21] Benjamin Howard:** Mhm.

**[00:20:22] Sara Snowden:** Not this one, it was the one on slide 4.

**[00:20:28] Sara Snowden:** Yeah, that one. So we have a pretty good view of what they're using and what that volume looks like. We just don't know the frequency and what's behind the volume, right? So keys like.

**[00:20:43] Benjamin Howard:** And we can.

**[00:20:44] Benjamin Howard:** And something that just came to mind, we can look at this information and think about the organization, think about like organization size and like what they're doing. And I think that's like some of the areas in which I'll drill down to understand, because it'll allow you to make potentially future projections. So like, let's say it's a...

**[00:21:06] Benjamin Howard:** say it's an AI company, right? And then how many are they running versus like another company? You can kind of start breaking it down into...

**[00:21:18] Benjamin Howard:** What their?

**[00:21:20] Benjamin Howard:** I guess, like, what their work, yeah, what they're doing and that work looks like, and see if that has a correlation between, like, how much they're...

**[00:21:21] Sara Snowden:** what they're doing.

**[00:21:27] Sara Snowden:** But we're not looking at AI companies, we're looking at like the VA and we're looking at the Department of Defense or we're looking at so on and so forth.

**[00:21:32] Benjamin Howard:** Yeah.

**[00:21:38] Benjamin Howard:** Yeah, yeah, exactly. Okay.

**[00:21:40] Sara Snowden:** So, and there is a lot of push from Fitara. It's a federal initiative that they are agencies need to basically adopt cloud, work on modernization. They need to increase their security. There's an executive mandate.

**[00:22:01] Sara Snowden:** that I have the numbers written down somewhere. There's an executive mandate that they basically up their game with digital transformations and stuff like that. So there is a lot of push from the overarching, you know, just government entities need to start embracing this.

**[00:22:20] Sara Snowden:** you know, reducing their costs and being more efficient in adopting cloud. So there's definitely drivers behind that. And I actually have, I can send you my initial business case, which will give you a little bit of context around kind of some of the drivers and kind of some of the revenue and things that we're looking at.

**[00:22:39] Sara Snowden:** I think Tyler strategy doc that I also sent you that I think you started, you said you start poking through. I think that one covers a little bit of it too.

**[00:22:44] Benjamin Howard:** Mhm.

**[00:22:48] Benjamin Howard:** And so do we have kind of an exhaustive client list?

**[00:22:55] Sara Snowden:** In what regard?

**[00:22:57] Benjamin Howard:** that we could start, you know, when we think about people to potentially talk to that are utilizing the services. Do we have a list?

**[00:23:05] Sara Snowden:** O.

**[00:23:06] Sara Snowden:** We could obtain one for sure. The customers that like I talked or I looked up their information for, those are listed on that tracker sheet. Those are people I found in Sigma. Normally we start with talking to the folks in the field. The essays help in a pre-sales capacity, the solution architects, the SEs help post sales. So we have resident technology services. Those customers are directly embedded at a customer or for a customer. So they're working all the time, day in, day out with them. The SEs are not dedicated, but they work very, very closely with their customers because Vault is like the most complicated project or product ever, and you can use it in so many hundreds of ways. Oh shoot, I'm missing a meeting. So the SEs tend to know what's going on in the customer's environment extremely well, which is why rather than going directly to customers at this stage, it was more, let's use what we have internally to start capturing information before we have to worry about kind of that customer validation part.

**[00:24:20] Sara Snowden:** Because really we just need to know we've got a lot of pieces to the puzzle. We just have to like pull the rest of it together.

**[00:24:20] Benjamin Howard:** No, that makes sense.

**[00:24:27] Benjamin Howard:** Okay, that makes sense. All right, well, let me take a look at this. I know you have to jump to the meeting, so I'll let you go. I'll take a look at this, absorb everything, absorb everything, and then I will get back to you. Thank you so much, Sara.

**[00:24:33] Sara Snowden:** Yeah, I'm 10 minutes late. I didn't even notice.

**[00:24:39] Sara Snowden:** Cool. Yeah, and let's set up time next week and continue chatting and I'll send some stuff your way that might be helpful to start establishing a little bit of context of the environment that we're working on and trying to drive some wins for.

**[00:24:41] Benjamin Howard:** Okay.

**[00:24:54] Benjamin Howard:** That was great. Thank you so much. You have a great rest of your day.

**[00:24:56] Sara Snowden:** Cool. Thank you. Have a wonderful day.

**[00:24:58] Benjamin Howard:** Big face.
