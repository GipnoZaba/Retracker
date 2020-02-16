using AutoMapper;
using Domain;
using Domain.Projects;

namespace Application.Projects
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Project, ProjectDto>();
            CreateMap<ProjectList, ProjectListDto>();
            CreateMap<ProjectTask, ProjectTaskDto>();
            CreateMap<UserProject, MemberDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}