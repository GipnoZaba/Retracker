using AutoMapper;
using Domain;

namespace Application.AppTasks
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppTask, AppTaskDto>();
            CreateMap<UserAppTask, MemberDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}