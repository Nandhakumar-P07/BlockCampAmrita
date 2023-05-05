package com.example.demo.blockchainvoting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.blockchainvoting.service.VoterIdService;

@RestController
@CrossOrigin("*")
@RequestMapping("/voteridlist")
public class VoterIdController {
	
	@Autowired
	private VoterIdService vs;
	
	@GetMapping("/checkvoterid")
	public boolean checkVoterId(@RequestParam String voterid) {
		return vs.existsByVoterid(voterid);
	}
}
