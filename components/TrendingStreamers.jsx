import React, { useState, useEffect } from 'react';
import { useTimeout } from 'react-use';
import { TwitchChat } from 'react-twitch-embed';
import {
  Icon, Box, Image, Heading, HStack, Text, Spacer, VStack, Link,
} from '@chakra-ui/react';
import {
  FiEyeOff,
} from 'react-icons/fi';
import OpenChatButton from './OpenChatButton';

const Main = ({ setStreamersList, chatFlex }) => {
  const [trendingStreamers, setTrendingStreamers] = useState([]);

  useEffect(async () => {
    if (!trendingStreamers.length) {
      const response = await fetch('https://api.twitch.tv/helix/streams/?first=3', {
        method: 'GET',
        headers: {
          'client-id': 'oc2v6nbh3v12i5i5x8et8bo7amnu9o',
          Authorization: 'Bearer ' + '0joge0i8si4qv6eifd9weoztm510cn',
        },
      });

      const result = await response.json();

      setTrendingStreamers(result.data);
    }
  }, [trendingStreamers]);

  return (
    <VStack>
      <Heading
        pb="16px"
        size="sm"
      >
        ...or check out the
        {' '}
        <Link href={`https://multistream.gg/${trendingStreamers.map((streamer) => streamer.user_login).join('/')}`}>top 3 online streamers</Link>
      </Heading>
      <HStack
        padding="16px"
        borderRadius="14px"
        borderWidth="2px"
        borderColor="#9147ff22"
        spacing="16px"
        _hover={{
          transform: 'scale(1.025)',
        }}
        onClick={() => {
          setStreamersList([...(trendingStreamers.map((streamer) => ({ broadcaster_login: streamer.user_login })))]);
        }}
      >
        {trendingStreamers.map((streamer, index) => (
          <VStack
            boxShadow="dark-lg"
            spacing="0"
            bg="#333"
            key={`${index}`}
          >
            <Box h="150px" w="300px">
              <Image
                borderRadius="4px 4px 0px 0px"
                boxSize="100%"
                objectFit="cover"
                src={`${streamer.thumbnail_url.replace('{width}x{height}', '1280x720')}`}
              />
            </Box>
            <HStack
              pt="4px"
              pr="4px"
              w="100%"
            >
              <Spacer />
              <VStack
                textAlign="right"
              >
                <Text
                  mr="4px"
                  fontWeight="semibold"
                  letterSpacing="wide"
                >
                  <Icon
                    viewBox="0 0 200 200"
                    color="green.400"
                    mr="4px"
                    mt="-2px"
                  >
                    <path
                      fill="currentColor"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </Icon>
                  {streamer.user_name}
                </Text>
              </VStack>
            </HStack>
            <HStack
              borderRadius="0px 0px 4px 4px"
              pr="4px"
              w="100%"
            >
              <Spacer />
              <VStack
                textAlign="right"
              >
                <Text
                  mr="4px"
                  fontSize="xs"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  color="#999"
                >
                  Streaming
                  {' '}
                  {streamer.game_name}
                </Text>
              </VStack>
            </HStack>
            <HStack
              pr="4px"
              pb="4px"
              w="100%"
            >
              <Spacer />
              <VStack
                textAlign="right"
              >
                <Text
                  mr="4px"
                  fontSize="xs"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  color="#999"
                >
                  Viewers:
                  {' '}
                  {streamer.viewer_count}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
};

export default Main;
