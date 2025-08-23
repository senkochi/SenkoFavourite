package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String avatar = oAuth2User.getAttribute("picture");
        System.out.println("Đã nhận request");

        Users user = userRepository.findByEmail(email).orElse(null);
        if(user == null){
            user = Users.builder()
                    .username(email)
                    .fullName(name)
                    .email(email)
                    .imgURL(avatar)
                    .createAt(LocalDateTime.now())
                    .role("Google user")
                    .build();
            userRepository.save(user);
        }
        return oAuth2User;
    }
}
