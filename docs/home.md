Ever wondered why there isn't a good open source alternative to Jira or Trello?

So did we, so we made Catkin! 



Our principles:

- Lightening fast
- More accessible than Trello
- More complete than Jira
- Higher quality stories and specs
- Open, and always free!



# App tour

## Fundamentals

### Items

Items is our generic term for anything that is a thing to do, or a description of some functionality. Some of you may think our take on stories vs epics vs features is strange, but we like it:

- Ideas: any idea you've had about the product - something crazy you don't want to forget, something you need more time to work on. Think of an idea like an egg that you're incubating, only while you're doing so you get to decide if it's a chicken, a dinosaur or an emu.
- User stories: pretty standard - a description of a piece of functionality that you want developers to implement.
- Epics: A larger piece of functionality, implemented through multiple user stories.
- Features: a larger peice of functoinality which is implemented thorugh multiple user stories or epics. The main difference here is that a Feature does not have a start or finish
- Spikes
- Technical tasks
- Admin tasks

### Personas

A persona is a description of a theoretical or real user of your application, and can be directly linked to any iteam. In Catkin you can save the following information about a persona: name, role, likes, pains and gains for a persona.

Persona management an area of passionate debate, and of course we're happy to evolve this feature.

### Workflow

- Ideation
- Ready
- In progress
- Done

### As a product owner I want to ...

#### Waste less time formatting stories so that I can do something more useful with my life.

- Persona tagging: controversial we know, but writing 'as a user' at the beginning of every story seems a total waste of time. Yes we get that it's supposed to make us understand the user needs, but let's get on board with DRY principles and save some ascii forests.
- Quality linting: Catkin checks what you're writing help make sure it's understandable for developers.

#### Stop arguing with developers about lack of anything remotely technical in my user stories. And while we're at it stop being forced to link my user stories to more documentation held in another system. And also, stop being a victim of the hypocrisy that is an agile developer asking the PO for more documentation.

*(note the author is a dev so is allowed to write that. Product Owners should tread lightly when addressing this topic)*

- A wise man who likes paella once pondered on this topic, and came to a pretty nice conclusion. In 90% of cases technical docs don't need to be so long, and most of them are boilerplate text from the template.
- Specifications: Catkin items have a spec section where you can be a little bit more technical than in a normal user story, without going nuts on unnecessary words in your standard template.
- Doc pages generation: This is an awesome feature, and we don't know why nobody else does it. Catkin can automatically export all stories and generate a website from them. This can also be combined with developer documentation if they work in Markdown (which they should).

### As a developer I want to ...