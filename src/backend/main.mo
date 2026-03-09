import Time "mo:core/Time";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

actor {
  type SocialLinks = {
    github : Text;
    linkedin : Text;
    twitter : Text;
    instagram : Text;
  };

  type Profile = {
    name : Text;
    title : Text;
    bio : Text;
    socialLinks : SocialLinks;
    resumeUrl : Text;
  };

  type PortfolioProject = {
    id : Nat;
    title : Text;
    description : Text;
    techStack : [Text];
    projectUrl : Text;
    imageUrl : Text;
    displayOrder : Nat;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  var nextProjectId = 4;
  var profile : Profile = {
    name = "Jane Doe";
    title = "Full-Stack Developer";
    bio = "Passionate developer with experience in web and mobile technologies.";
    socialLinks = {
      github = "https://github.com/janedoe";
      linkedin = "https://linkedin.com/in/janedoe";
      twitter = "https://twitter.com/janedoe";
      instagram = "https://instagram.com/janedoe";
    };
    resumeUrl = "https://example.com/resume.pdf";
  };

  let portfolioProjects = Map.fromIter<Nat, PortfolioProject>(
    [
      (
        1,
        {
          id = 1;
          title = "Project One";
          description = "An innovative solution for task management";
          techStack = ["React", "Node.js", "AWS"];
          projectUrl = "https://github.com/janedoe/project-one";
          imageUrl = "https://example.com/images/project1.png";
          displayOrder = 1;
        },
      ),
      (
        2,
        {
          id = 2;
          title = "MobileAppX";
          description = "Cross-platform mobile application";
          techStack = ["Flutter", "Firebase"];
          projectUrl = "https://github.com/janedoe/mobileappx";
          imageUrl = "https://example.com/images/mobileappx.png";
          displayOrder = 2;
        },
      ),
      (
        3,
        {
          id = 3;
          title = "DataVisPro";
          description = "Data visualization tool";
          techStack = ["D3.js", "TypeScript"];
          projectUrl = "https://github.com/janedoe/datavispro";
          imageUrl = "https://example.com/images/datavispro.png";
          displayOrder = 3;
        },
      ),
    ].values()
  );

  let contactMessages = List.empty<ContactMessage>();

  public query ({ caller }) func getProfile() : async Profile {
    profile;
  };

  public shared ({ caller }) func updateProfile(updatedProfile : Profile) : async () {
    profile := updatedProfile;
  };

  public query ({ caller }) func listPortfolioProjects() : async [PortfolioProject] {
    portfolioProjects.values().toArray();
  };

  public shared ({ caller }) func addPortfolioProject(newProject : PortfolioProject) : async PortfolioProject {
    let projectWithId : PortfolioProject = {
      id = nextProjectId;
      title = newProject.title;
      description = newProject.description;
      techStack = newProject.techStack;
      projectUrl = newProject.projectUrl;
      imageUrl = newProject.imageUrl;
      displayOrder = newProject.displayOrder;
    };

    portfolioProjects.add(nextProjectId, projectWithId);
    nextProjectId += 1;
    projectWithId;
  };

  public shared ({ caller }) func updatePortfolioProject(updatedProject : PortfolioProject) : async () {
    switch (portfolioProjects.get(updatedProject.id)) {
      case (null) { Runtime.trap("Project not found") };
      case (?_) {
        portfolioProjects.add(updatedProject.id, updatedProject);
      };
    };
  };

  public shared ({ caller }) func deletePortfolioProject(projectId : Nat) : async () {
    if (not portfolioProjects.containsKey(projectId)) {
      Runtime.trap("Project not found");
    };
    portfolioProjects.remove(projectId);
  };

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let contactMessage : ContactMessage = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactMessages.add(contactMessage);
  };

  public query ({ caller }) func listContactMessages() : async [ContactMessage] {
    contactMessages.toArray();
  };
};
