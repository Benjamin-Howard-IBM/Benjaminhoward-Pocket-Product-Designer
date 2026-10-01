---
title: CSX/Hashicorp Discovery
---

**CSX HashiCorp Azure vWAN Peering Discovery (FRB-1813)-20260930_093301-Meeting Recording**

September 30, 2026, 1:33PM

33m 8s

**\
Benjamin Howard** started transcription

**\
Durgesh Shukla** 0:08\
Yeah, it kicks it kicks everyone out of their mic and their and their video once recording is started, so you guys will have to enable your mics again.

**\
Singh, Radesh** 0:19\
Oh, sorry. Yeah, I just noticed that. Yeah, so Erica, so Derek, I was saying it's just going to be like all our other vaults that we have, as far as I can tell, the things that are in Openshift. Yeah, yeah, yeah.

**\
Schimcek, Derrick** 0:26\
Yeah.\
Yeah, yeah, normally, normally what we do on situations like this, because we have this with some other some other vendors, is I just connect the Vwan resource ID they provide to the secure hub. That way it goes through the firewall. We need to they need to we need to pick an IP range that is not in use for us, so that normally will give them a range.\
For their VNet, or they they they provide us, you know, something that's not already on our network, right? And then we connect it in, and then it just works, right? Yeah, we obviously have to set up firewall rules, but otherwise it just it just works, right? Then, then all of our networks there can communicate with it.

**\
Singh, Radesh** 0:59\
Mhm.

**\
Schimcek, Derrick** 1:11\
and it can communicate with all of our networks. And if it needs to be routed from on-prem, then we give it an IP address range that's routed into one of our ranges that's already up in Azure that we route. If not, then we can give it whatever range, right? So.

**\
Singh, Radesh** 1:27\
That makes sense. Hey, Durga, do you want to drive from the document you made and see and see if how closely it aligns to what Derek described?

**\
Durgesh Shukla** 1:31\
Yeah.\
Yeah, of course, of course. I'm figuring out how do I... Where is the sharing? Oh, okay, there it is.\
So.\
This, so I also have my design team and my engineering manager on call on this one. I made them join because if you guys have some different ideas, we can hear those feedback items up front, right? So Sudeep and Benjamin, feel free to ask questions and jump in.\
and Nicole, you as well, feel free to poke holes at this. But what we are basically trying to do is we are trying to build a simple hub connection. So we will use something like the virtual hub connection and we will make our...\
VNet, which basically is something that IBM Hashicorp will spin up, make that talk to your virtual Vwan. And then there will be a VNet involved in this sort of a setup. We cannot escape the usage of VNet. I know there were like some concerns around.\
VNet peering. And then the reason I wanted to have a call or have the conversation was because we had some clarifying questions, right? Like one of which was like we were not sure if you guys have used like a SAS vendor with the Vwan setup. So.\
I know you did mentioned SAP, so is SAP also SAS or what is the other vendor that you have in mind? SAP itself is SAP.

**\
Schimcek, Derrick** 3:14\
Yes.\
We have.\
Yes.\
Yes, SI.\
I think it's SAP. Let me go look it up. Anyway, it's one of our financial vendors. They have their VR and their primary VWANs. One is in East and one is in West. The East one is connected to our East secure VWAN hub and the West one is connected to actually our central secure VWAN hub since we don't have a VWAN in West anymore.\
And I think I have a couple others, but I'd have to go. I'd have to go pull them up.

**\
Durgesh Shukla** 3:50\
Okay, so these examples would be extremely helpful to us. What we will do is we'll use them as an inspiration. We'll look up their documentation and we'll try to mimic.

**\
Schimcek, Derrick** 4:01\
So, what what normally what normally happens is?\
You'll give me the resource ID, which is the big long thing that says like...\
And I'm gonna pull, it looks like this, I'm gonna pull one real quick.\
Ohh, so good.

**\
Young, Eric** 4:19\
The UUID format, the GUID probably.

**\
Schimcek, Derrick** 4:23\
No, it's not the good with normally. It's normally the, it's this sucker.

**\
Young, Eric** 4:25\
Okay.\
Oh, it's a long URI subscription slash whatever slash.

**\
Schimcek, Derrick** 4:31\
Yeah, yeah, yeah, yeah, that one here, yeah, yeah, subscriptions last, yep, it's normally this one.

**\
Young, Eric** 4:34\
Lite slash OK.

**\
Schimcek, Derrick** 4:44\
Oh, this one?\
And then I go put that in when you go into Vwan, you go create a new one.\
Oh.\
And I will put that in. Let me share my screen real quick.

**\
Durgesh Shukla** 5:00\
Okay.

**\
Schimcek, Derrick** 5:02\
Is that it?\
So normally I'll come in here, I'll click add connection.\
Is that what I did?\
I'm gonna try to find the steps, trying to remember if I did that.\
Or do I have to do it from the command line? Anyway, you might be right, actually. Let me go try to find the commands I ran the last time to do this. It's been a little bit.\
But there's a steps. I think actually I had to sign into their VWAN to create it or try sign into their.\
There's subscription for a second, but anyway, we connect those if you look over on secure.\
Is that?\
Itss this one right here.\
This thing right here, which I can't, I don't have administrative access, obviously, but this is this is what it looks like.

**\
Nicole Williams** 5:54\
So, it's so it's still connecting to a VNet.

**\
Schimcek, Derrick** 5:58\
Yes, yeah, it has to connect to VNet.

**\
Nicole Williams** 5:59\
Okay.\
OK.

**\
Schimcek, Derrick** 6:02\
You have to connect the VNet into the Vwan Hub. Let me go try to find the...\
We gotta try to find the if I had the commands sitting around somewhere that we ran to do this, 'cause I think I saved them in the text file.

**\
Durgesh Shukla** 6:10\
And.

**\
Singh, Radesh** 6:13\
Yes.\
I was gonna say, I think I sent that.

**\
Durgesh Shukla** 6:15\
And is this VNet? Is this VNet setting in the Azure setup, or is this something that the application, the SAS?

**\
Schimcek, Derrick** 6:22\
Azure.\
Azure.

**\
Durgesh Shukla** 6:24\
It is in Azure.

**\
Schimcek, Derrick** 6:26\
So you have to have a VNet integer in your tenant that then I connect to and then you approve that we can talk, right? So it's like a multi-step process. Or you have to grant my user account the ability to...\
To connect or to to modify your your tenant, right? Those are the two options that or.

**\
Benjamin Howard** 6:51\
Is there a preference?

**\
Schimcek, Derrick** 6:55\
I prefer y'all click approve, but that's, you know, that's not caught up to you. But that or the other option when you're trying to do this is if it's just like an IP address that everything's hitting and it's not like a full VNet with a whole bunch of resources, right?

**\
Singh, Radesh** 6:58\
Yeah.

**\
Benjamin Howard** 6:59\
But.

**\
Schimcek, Derrick** 7:15\
Then what we do in that case for like storage accounts or something, or like database servers, is you create a private endpoint that is, it's the same process. The private endpoint connects to a resource in your tenant, and then I set up the private endpoint, and then you have to go click approve on whatever the resource is.\
Those are the two ways it normally functions. So I would think in this case, since it's a whole SAS solution, that it would probably be the VNet peering.\
Let me go see if I can find those steps.

**\
Durgesh Shukla** 7:47\
Sudeep, can you chime in on this one?\
Sudeep.

**\
Nicole Williams** 7:55\
You're muted, Sudeep.

**\
Sudeep Desai** 7:56\
Yeah, yeah, so yeah, I just unmuted. So, so I just wanted to understand the problem here. So, the current problem states that we are not able to attach the the HVN VNet to the VHub directly, so we need to basically set up, set up, create a bridge VNet in between, peer that VNet, and that bridge VNet will be part of the VHub.\
That is what the current problem stands. So we are basically, as per the discovery, we are trying to identify a way when we can attach the VNet on which the HUN, sorry, yeah.

**\
Schimcek, Derrick** 8:29\
So, from your end, you can't attach your VNet to our hub, is what you're saying, and you need to peer it directly to. OK, well, that's easy too, yeah, then, then yeah, in that case, in that case, it's like...

**\
Sudeep Desai** 8:34\
Yes, yes, yes.\
Yeah, so the Azure, Azure loop.\
Sorry, go ahead, yeah.

**\
Schimcek, Derrick** 8:43\
Yeah, in that case, it's like we do with our ingress VNets. There's an ingress VNet that's attached to the VWAN hub, and then there's another VNet peer to it. So in that case, we're going to...\
Let me see if I find that thing.

**\
Singh, Radesh** 8:58\
Trying to find that document. I don't know if it helps at all, but there was a document where Vamshi and you, I think, worked with the SAP thing and had all the commands you guys did.

**\
Schimcek, Derrick** 8:59\
Yeah.\
Yeah, that's that one. But they're saying they don't want to peer. They can't peer their VNet directly to the VWAN like those guys did. I think it's...

**\
Singh, Radesh** 9:11\
Oh, okay. Got it.\
Mhm.

**\
Sudeep Desai** 9:16\
Yeah, so we did discover there exists certain Azure APIs that would let us attach the VNet directly to the VHub.

**\
Schimcek, Derrick** 9:18\
Sso.\
Yeah.\
Yes, that's correct. There are.\
Yeah, you can do that. So you have to, normally you log, normally what you do is like, like if me or Sean can find that document, it's normally I have to log in and authenticate in both tenants and then I have to take the GUIDs and I have to go create the link right to the VWAN hub.

**\
Singh, Radesh** 9:31\
Will that work?

**\
Sudeep Desai** 9:31\
But...\
Yes.\
Yeah.

**\
Schimcek, Derrick** 9:48\
That's what I did the last time we did this. Again, I had to find the...\
The deal, but...\
Huh.\
Yeah, so like...\
Well, I mean...

**\
Singh, Radesh** 10:15\
Gateway or whatever it is. I don't know, man.

**\
Schimcek, Derrick** 10:15\
Ohh.\
I don't know exactly. So the other option is yes, we can create a VNet here like this, and then that's peered to the hub, and then you peer it here, and then we let this VWAN forward traffic back and forth. Again, same as before, can't have an IP address conflict and all that good jazz.

**\
Singh, Radesh** 10:25\
Mhm.\
Ohh.

**\
Schimcek, Derrick** 10:36\
And then this one, we can...\
Not that we would, but we can restrict flow if we want this way to where I only allow either our traffic to go to you or your traffic to us.

**\
Durgesh Shukla** 10:51\
Okta.

**\
Schimcek, Derrick** 10:52\
So yes, we can do that option too. We prefer to directly attach stuff to our Vwan hub personally, because that means it goes directly into our firewall after it comes off of your network or off our network to you. But this way works too, and it also will go through the firewall. It just has to hit that VNet first.

**\
Sudeep Desai** 10:54\
So, but for that...

**\
Schimcek, Derrick** 11:12\
So we prefer to directly attach them to the Vwan hub, but if that's not an option from your standpoint, then we can do it this other way.

**\
Sudeep Desai** 11:19\
So, so we can basically attach the VNet, the HVN, under which the HVN is running directly to the hub, but that would require a certain set of service principal to be created, a role to be created, and that role assignment to be done to the service principal.\
So that we can attach the VNet to the basically the VHub directly.

**\
Schimcek, Derrick** 11:44\
Okay.

**\
Sudeep Desai** 11:44\
Without any appearing, I would say so.

**\
Schimcek, Derrick** 11:47\
Well, I mean, if you're attaching it to the VWAN hub, you peer the VNets, that's why that's why the attachment to the VWAN hub does, yeah.

**\
Sudeep Desai** 11:51\
Yeah, yeah, yeah.\
So just like currently today, if we want to peer to VNets, we basically create a service principle as per the documentation. We create a service principle, we create a role, and we do a role assignment. So similarly for attaching to the VHub also, we need to create a service principle and a corresponding role that will allow us to read or write hub connections and then.

**\
Schimcek, Derrick** 12:04\
Okay.\
Okay.

**\
Sudeep Desai** 12:15\
The third one is the role assignment we need to do. So that will let us to basically call the Azure API with the subscription ID and the tenant ID, the corresponding subscription IDs and the tenant IDs, and attach the VHub to attach the VNet on which the HVN is spun to the VHub of the Azure account.

**\
Schimcek, Derrick** 12:19\
Okay.\
Okay, and from our perspective, that's fine. We just need to have a...

**\
Sudeep Desai** 12:38\
Okta.

**\
Schimcek, Derrick** 12:40\
We need to have what roles you need and what.

**\
Sudeep Desai** 12:44\
Uh-huh.

**\
Schimcek, Derrick** 12:46\
You know what, what it needs. I'm assuming it's just a join role. I probably don't want to give you, yeah, I'm not going to give you delete access on my VWAN hub, but, but yeah, if you're just doing the join role, then yeah, that's fine. That's not a problem. We just need to know exactly what permissions it needs or if it's a custom role.

**\
Sudeep Desai** 12:52\
Yep, I can share that.\
Okay, sure, sure, yeah.\
Yeah.

**\
Schimcek, Derrick** 13:06\
that we need to create and then we will create service principal, send you the secret and let you run that. And then just let us know if it's a one-time thing and we can delete the service principal if it's something that needs to stay around. I mean, that's.\
It's not really a problem for us.

**\
Sudeep Desai** 13:23\
Okay, okay, okay, understood.

**\
Schimcek, Derrick** 13:25\
I just need, I need detailed steps, you know, I need to have a little bit more than this. I need to have, you know, what role, what exactly is a custom role, what exactly, you know, permissions the role needs, where I need to set the role access at, you know, all of that good jazz.

**\
Sudeep Desai** 13:44\
Sure, sure. I can set, I can create a document or like create a document where in where we can share the prerequisite steps and we can align on that.

**\
Schimcek, Derrick** 13:56\
Yep. Yeah, because like I said, we would rather directly attach you to the Vwan hub. That way, the first hop you do after you leave your network is hit our firewall. And that's generally what we like to do from a security standpoint. But if there are certain vendors that can't do that, they can attach to the Vwan hub. And for those vendors, we do peer them to a network and have it flow through it.

**\
Sudeep Desai** 14:01\
Yeah.\
Okta.

**\
Durgesh Shukla** 14:09\
You.\
Hey, Derek and Sudeep. So this rule creation service principle, we will have to do a security review on our side, IBM side as well. So I wanted to understand like the vignette peering is still on the table as an alternator because I heard like there was some.\
restrictions around VNet peering from your side as well. Because one of our other engineering leads, he had suggested we put this.\
One more VNet in between to do the appearing, like sort of like a dummy, and then...

**\
Schimcek, Derrick** 14:52\
Yeah, yeah, it's an ingress feed is what we call them here, basically, yeah.

**\
Durgesh Shukla** 14:55\
Yeah, yeah. Is that still an option for you guys? Because from how I understood it.

**\
Sudeep Desai** 14:55\
Yeah.

**\
Schimcek, Derrick** 14:59\
It is in the sense that we can do it because we have certain vendors that can't support whatever their application is, doesn't support Vwan peering yet. And so for those vendors, yes, we still have the other option, but again, we prefer to peer directly to the Vwan hub.

**\
Durgesh Shukla** 15:15\
Got it. Yeah, because two things, right? One is like the security from my own security team here. We have like an architecture and review board that will consider such type of features being built. But the second piece is also the timeline, right? Like from my standpoint as a something.\
that Nicole was talking about.\
In my head, the VNet peering is faster. Now, Sudeep can correct me there, but we should have that alternate option also on the table, just in case we are not able to facilitate within the given time frame, like that Nicole expects it to be, right? So that's all I'm trying to say. Let's have both the options on the table.

**\
Schimcek, Derrick** 15:58\
Yep.

**\
Durgesh Shukla** 15:59\
Let's not close the door on any of these, and we can we can continue discovery, right? And if we end up building this direct connection with your Vwan, and...

**\
Schimcek, Derrick** 16:04\
Yeah, I get.

**\
Durgesh Shukla** 16:10\
Although, like, for the interim, we use the VNet pairing, that's fine too, right? From our side, we can migrate you over eventually, but I don't know if you have the appetite for that, but just to just to get things rolling.

**\
Schimcek, Derrick** 16:21\
I...\
I don't care.

**\
Young, Eric** 16:22\
Hey, Derek, Derek, before Vamshi left, the direction that he was saying was that we must use the VWAN. And

**\
Schimcek, Derrick** 16:25\
Yeah.\
I mean, that's what we're trying to push people to do.

**\
Young, Eric** 16:37\
It wasn't really a preference thing. He said we are not allowed to not use the VWAN.

**\
Schimcek, Derrick** 16:43\
I don't know where he got that from, but unless there's some directive from somebody I'm not aware of.

**\
Young, Eric** 16:46\
And I think...\
And it might be a directive from Wilson at the FISO level too. I'm not sure on that.

**\
Schimcek, Derrick** 16:56\
It might be, I would have thought somebody would have talked to me about that if that was the case, because we've done both. I think Vamsi just didn't want to do the other because it makes it a little complicated, because it's kind of the old architecture. We used to have a hub and spoke, right, where you would connect everything into one central VWAN, and then everything would talk off of that. And now we switched this VWAN architecture.

**\
Young, Eric** 16:57\
And we get on.

**\
Singh, Radesh** 17:15\
Yeah.

**\
Schimcek, Derrick** 17:17\
where basically once you connect it into it, it's kind of a nebulous cloud. And again, like I said, we want to do the VWAN because it goes directly into our firewall as soon as you hit the network. So we have a little more control, not in the sense that the other doesn't, but you know, in theory, somebody could come in and connect the peer VWAN into the ingress view.\
plan that you have, or VNet, sorry, ingress VNet you have, and bypass the firewall. But somebody would have to maliciously do that. So I have not heard that because we've done the other before, but maybe Vamshi had a reason for it that I'm not aware of.

**\
Singh, Radesh** 17:53\
Yeah, yeah, I think you encapsulated what he said though there, Derek, and like, and yeah, that's exactly it. He basically said that the hub, the other way is the, I think he called it the hub and spoke model, is the old, he's like, that's the old way, we don't do that anymore. And he's, and so he told me, he was like, it needs to be peered to the Vwan.

**\
Schimcek, Derrick** 18:05\
Yes.\
It does.

**\
Singh, Radesh** 18:14\
So yeah, and so I don't have a, we're just trying to align to what you guys are doing, right?

**\
Schimcek, Derrick** 18:16\
But, but we do have, we, yeah, we do have vendors that can't support the VWAN peering, there's, and for those we have to do something different, but yes, if like, if it can be supported, we want people to do the VWAN peering.

**\
Singh, Radesh** 18:27\
Ten 4.\
So, the method that were the two methods were talking about, I kind of got lost, which is which is which is one of them gonna actually be a Vwan peer, or is it all just gonna be a hub and spoke?

**\
Schimcek, Derrick** 18:43\
No, they were talking about peering their VNet to RV with.\
directly. That was one of those things. He was saying that they might not support it currently and they'd have to go to, right? I'm not speaking out trying that you'd have to go to architecture board and get it approved and build it out. It might take some time, right?

**\
Singh, Radesh** 18:47\
Oh, okay, cool.

**\
Durgesh Shukla** 18:59\
That's it, yeah, yeah.\
So, so the challenge there is timeline and capacity, because we will have someone build this feature out. So, in the interest of like timeline goals, we, if we, because...\
I, like, I am aware that many vendors don't support this, right, and for different reasons.\
That was one part of it because of the complexity involved in building that feature out, but at the same time, if it can be done, we want to do it. It's not like we are opposed to doing it. It's just if we can put the VNet peering in the interim, get that working, and in the meanwhile, we try to continue.\
building this other bridge with you guys.

**\
Schimcek, Derrick** 19:48\
If we want to talk to Ingle or somebody, you know, if you have concerns there, if we can go have a discussion with them, but...

**\
Young, Eric** 19:57\
Well, my main concern is that if we did set up the simple VNet peering and bypass the Vwan, then we would end up in a situation where now we have to switch it over later on. And if we've got something in.

**\
Schimcek, Derrick** 20:08\
Yeah, you wouldn't be bypassing the VWAN and you would still be connected to VWAN and you'd just be taking a hop through a transition VNet to get to the VWAN.

**\
Young, Eric** 20:18\
Okay.

**\
Schimcek, Derrick** 20:18\
If that makes sense, you'd still you'd still connected back up.

**\
Young, Eric** 20:20\
So, the question I have is, what difficulties would there be in switching over to, we'll say, the final state model?

**\
Schimcek, Derrick** 20:28\
The difficulty would be that you would have to lose connectivity for a period of 5 minutes while you're deleting the old peering and then connecting it to the Vwan hub. So while you're doing that work, you'd be down.

**\
Young, Eric** 20:44\
Okay, would there be network changes like IP, DNS, anything?

**\
Schimcek, Derrick** 20:50\
No matter what we do here, no matter what we do here, it depends on where this access needs to be. If access needs to be from the field or from on-prem or from QTS or from anything else besides Azure itself. So if it needs AWS connectivity or it needs any of the other things.\
Google, OCI, any of that, then we have to get Verizon involved because we have to set up that whatever, if we have an IP range that's not in our currently routed IP addresses, then we have to go add that to the routers to route.\
from everywhere else. Now, if we use an IP range that's already dedicated to Azure East that we have, then we don't have to worry about that. But it just depends. Sometimes the vendors can't support the IPs that we already have assigned in the range we already have assigned. So if that's the case, then we have to go add that into routing.\
If it just needs to be in Azure, then it doesn't really matter what the IP range is, as long as it doesn't conflict with the Azure ranges. And the wider ranges, we don't want to assign IPs, obviously, that are used anywhere in our network, even if we're not routing them. But then it doesn't really matter, then it just, it sits in Azure and it's it.\
We don't have to worry about the routing everywhere else. So those are the caveats to that.

**\
Young, Eric** 22:14\
I think it all fits in Azure here. When we create the dedicated Vault clusters, they're all in Azure tenants.

**\
Schimcek, Derrick** 22:22\
So again, we don't want to use an IP range. We need to get with Verizon and make sure the IP range that we use isn't assigned anywhere else if they have to tell us like there's a certain range they need. Otherwise, we normally give them a range to build out the network on. They'll tell us if they need a slash 24, slash 25, slash 20, you know.\
to whatever it is, right? And then we give them that range normally from our Azure East IP ranges that we own and manage, and then we give it to them, and they build out the environment on a VNet on that range. We connect it to the VWAN, and then you're able to talk to it.

**\
Young, Eric** 23:00\
So, I mean, I'm okay with having a small outage to make this network change later on, but as long as we have the confidence that we're sure that the switchover will work properly, have we done it before?

**\
Schimcek, Derrick** 23:13\
Yeah, we had all of all of our VNets at one point were connected to a hub and spoke, including the the was the SAP, and then we switched over to VWAN and you have to disconnect everything for a period of time and then connect it to the VWAN hub and you lose connectivity or you do that and then connectivity comes back as soon as connect to VWAN hub.

**\
Young, Eric** 23:19\
Okay.

**\
Schimcek, Derrick** 23:33\
We like the VWAN hub too, because when we connect it to the secure hub, every all traffic between VNets goes through the firewall, so it makes it more secure.

**\
Young, Eric** 23:44\
All right, so I think from our side, we need to verify if going this route option is permissible.

**\
Schimcek, Derrick** 23:45\
Like this.\
Yep.

**\
Young, Eric** 23:55\
Before we commit to that, and...\
Could you forward over those docs you have, Derek, on how we make this transfer from?

**\
Schimcek, Derrick** 24:05\
Yeah, let me try to find my SAP stuff.

**\
Young, Eric** 24:09\
Yeah, and I mean, if we've done it before and we're confident, then I'm fine with that. The, I think I have one more thing I wanted to ask, but it just slipped my mind. I'll let anyone else speak up right now while I think about that further.

**\
Singh, Radesh** 24:25\
Derek, not that it matters, I think, because I think we decided that whatever was done for SAP is not compatible with what we need to do here. But I did find the e-mail and send it to you and Nicole, just in case you all want it.

**\
Nicole Williams** 24:38\
Yeah, that's great. So what I'm hearing is the preferred approach and maybe the only approach is VNet directly to the Vwan hub. If we do, the alternative is a bridge VNet peering option, which Derek thinks could work. Eric, you're going to check on if that and confirm if it will work.\
Because that way we could get you guys deployed in engineering team. Please correct me if I'm speaking out of turn, but that way it would work and you would just have to cut over later on. But you're going to check if that's.\
A viable workaround. I do think we tried that workaround before, and Durgesh and Sudeep, I'll send you what we tried in the past with them. We did try a transit VNet option, but...\
I think that's the two routes right there.

**\
Schimcek, Derrick** 25:35\
Yeah, so yeah, the command Sean sent it, that's the right ones. That's you log into both of the tenants, you authenticate with whatever you're using, and then you get the information from the from y'all's tenant, and then you use it to create the connection to the resource. And in this case, because I had permissions on both tenants.

**\
Nicole Williams** 25:35\
Okay.

**\
Schimcek, Derrick** 25:55\
It allowed me to do it, and that was that was kind of the the factor that some other people don't support is, you know, allowing us to log on temporarily to their tenant to go create this connection, so.

**\
Singh, Radesh** 26:04\
Yeah.\
And Nicole, feel free to share that with the team. I didn't have your e-mail addresses, but if you want to share that with them so they can look it over, I mean, it may help us.

**\
Schimcek, Derrick** 26:11\
Yeah.

**\
Nicole Williams** 26:16\
Yep, I'll forward it out. Yep. And Durgesh and engineering team, I know we're coming up on time. Do you have any anything else, questions, next steps, clarity needed? Let me know what you guys mean.

**\
Durgesh Shukla** 26:31\
I think I think I'll have to regroup with Sudeep once just to understand because

**\
Schimcek, Derrick** 26:37\
Hey guys, I got a drop for please your staff. If y'all need anything else, hit me up.

**\
Nicole Williams** 26:42\
Thanks, Derek.

**\
Singh, Radesh** 26:42\
Understood, man. Thanks.

**\
Durgesh Shukla** 26:42\
Good.

**\
Benjamin Howard** 26:45\
Thank you.

**\
Sudeep Desai** 26:45\
Yeah, so maybe I wanted to just have a word. So current VNet, you mean the VNet peering is already available. You can from the portal, you can set up a peering connection between 2 VNets and you can roll the ball currently. But yeah, that is already a variable option. If that is a variable option, it is already something work.\
A working solution, yeah, yeah, all we also already support it, yeah.

**\
Durgesh Shukla** 27:08\
We are supported.

**\
Nicole Williams** 27:13\
Yeah, and we tried it with them and Eric and team, yeah, that we, that's what.

**\
Singh, Radesh** 27:14\
Yeah, we...\
Yeah, that was our initial path.

**\
Nicole Williams** 27:18\
I, we were you told that, yeah, 'cause you guys were told to shut it down, which is why we went down the the feature request route of of getting this going.

**\
Singh, Radesh** 27:21\
Yeah.\
Yeah, because we went, we used the tools that were available. I think it was the hub and spoke approach and it just, it didn't work. And whenever I, whenever I talked with Bamshi or Derek, I didn't talk, I think I talked with Derek and Bamshi about it, but they just kind of said, you know, no, it's not, don't do it that way. Or at least Bamshi did. He was opposed to it.\
And said, you need to do the VWAN pairing, so...

**\
Durgesh Shukla** 27:51\
If you guys can get us an exception, Derek, or sorry, Radesh, on this one thing, we would like to have that. The reason being because here, I'm just being honest, right? Like a feature takes a while to build, there's capacity to plan, and then there will be timelines.

**\
Singh, Radesh** 27:59\
What?\
Well...\
Yeah.

**\
Durgesh Shukla** 28:11\
And there'll be like, or instead I could rather get you started on the VNet, right? And continue these conversations on the side with Derek and folks, right? That's all I'm trying to put on the table here. I understand your previous architect might have had his reservations with this, but.\
you go onto the internet and you see major cloud security vendors or any kind of security vendors, they are having a tough time integrating directly with the Vwan for various multiple reasons. They're not the same reasons every time. But I just don't want to slow things down here.

**\
Singh, Radesh** 28:32\
Yeah.

**\
Durgesh Shukla** 28:51\
For, for.

**\
Singh, Radesh** 28:51\
Oh, hell yeah. Yeah, I agree. And I don't think from what I heard Derek say, he has no objection to it. And Derek would be the one that, you know, he would talk with CPS, you know, his boss, I guess, and all of our security people just to make sure they don't have any issues. But\
Doesn't sound to me like he's unwilling to try it. So we definitely can give it another shot. At least Eric, Eric, do you agree with that?

**\
Young, Eric** 29:19\
I mean, as long as...\
As long as Derek's boss and our CISO are good with trying it, then I'll be fine with it. That has been the stance since the beginning, so...

**\
Singh, Radesh** 29:29\
Yeah.\
Yeah, we're just trying to align with what we're being told, right? And so initially it was almost like a hard no, you can't go any further than this. Now it sounds like it could be a possibility. So I mean, I think in the interest of moving things forward, I think, you know, as long as they don't push back, I think we're good with that.

**\
Durgesh Shukla** 29:52\
Okay, we'll wait for your answer on that. And meanwhile, I'll connect with Sudeep on the second option, see how we can get the ball rolling on our end. That the whole service principle thing is kind of making me doubt things on our side, to be honest with you guys. But we'll get that vetted on our side.

**\
Singh, Radesh** 29:55\
Yes, Sir.\
Ooo.\
Itss.

**\
Young, Eric** 30:09\
Is that?\
Is the service principal thing a requirement of the VWIN or or this VNET thing?

**\
Durgesh Shukla** 30:17\
requirement for the Vwan.

**\
Young, Eric** 30:19\
Okay. All right. Thanks.

**\
Sudeep Desai** 30:21\
Already, that is a I can share you a customer for customer facing doc. We already have a customer facing doc and that is an approved one. So for VNet peering, we don't have any approvals required or something. This is an established solution. For Vwan Hub is something which we may might need to request.

**\
Singh, Radesh** 30:39\
I think you're going to share the doc that we used, Sudeep, but we used it. We could establish the peer, it just didn't work. It was weird. I mean, anyways.

**\
Young, Eric** 30:39\
Okay.

**\
Nicole Williams** 30:50\
I think you guys tried a workaround approach because we thought we were operating under the assumption you couldn't do V-net peering at all. And so there was this secondary kind of a bridge V-net that still was involved, but I think that was the approach that didn't work, Sean.

**\
Singh, Radesh** 31:01\
Copy that.\
And.\
Oh.

**\
Nicole Williams** 31:11\
our supported approach of just peering the HVN to the Venet is established a common pattern. We thought, again, that wasn't an option, so we had to do this workaround, and that was where we were getting issues.

**\
Singh, Radesh** 31:18\
Action.\
I got you. Yeah, definitely share what you got. Yeah, share what you got. I'll share it with Derek and I'll try to get it on an e-mail where we're all agreed we're going to move forward with a approach, you know, with the VNet peering or whatnot, with the goal of transitioning over to the Vwan once it becomes available.

**\
Nicole Williams** 31:28\
I think it's...\
Okay, I'll send you.\
Let me see our documentation here. Oh.

**\
Durgesh Shukla** 31:53\
I just got a link that Sudeep had shared and I put it in the chat. I don't know if we...

**\
Nicole Williams** 31:57\
Thank you.

**\
Singh, Radesh** 32:00\
I got it. Thank you.

**\
Durgesh Shukla** 32:00\
So basically, what I'm understanding is technically this is like a third approach, right? Like almost like a, because transit VNet was the other approach that we already tried. So now that is different. Now we are talking about direct VNet peering. And on that, CSX team has to come back to us.\
And the first approach is the VMAN thing. We will, so we will discuss that and we'll come up with timelines on when we realistically can do that. But we would love to know if you can do the direct VNet peering support. If you can, we should get that ball rolling, right? I think.\
That's a good path for her.

**\
Singh, Radesh** 32:42\
Understood. And this document you just linked me to is the direct V WAN. Sorry, V net period.\
Okay, thank you very much.

**\
Young, Eric** 32:54\
All right. Thanks, everyone.

**\
Nicole Williams** 32:55\
I think that's all from today. We'll be in touch with next steps and everything.

**\
Young, Eric** 33:01\
Story.

**\
Nicole Williams** 33:02\
Alright, thanks guys.

**\
Singh, Radesh** 33:02\
Awesome. Thank you all.

**\
Young, Eric** 33:03\
Have a great day, everyone. Bye, everyone.

**\
Sudeep Desai** 33:04\
Thanks. Thank you.

**\
Durgesh Shukla** 33:04\
Thank you, folks. Bye.

**\
Benjamin Howard** stopped transcription
