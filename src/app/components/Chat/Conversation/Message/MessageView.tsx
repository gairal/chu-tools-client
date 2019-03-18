import * as React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';

import { IMessageContent } from '@/store/chat/types';
import { addCommand } from '@/store/commands/actions';

interface IPropsFromState {
  content: IMessageContent;
  isBot: boolean;
  user: string;
}

interface IPropsFromDispatch {
  saveCommand: typeof addCommand;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

const Message: React.SFC<AllProps> = ({
  saveCommand,
  isBot,
  user,
  content,
}) => {
  const createMarkup = (text: string) => {
    return { __html: text };
  };

  const speak = () => {
    if (!SpeechSynthesisUtterance || !content.text) return;
    const msg = new SpeechSynthesisUtterance(content.text);
    msg.pitch = 2;
    window.speechSynthesis.speak(msg);
  };

  const save = (q: string) => {
    return () => {
      saveCommand({ q });
    };
  };

  return (
    <Bubble isBot={isBot}>
      <Name>
        {!isBot ? (
          <button onClick={save(content.text)} type="button">
            +
          </button>
        ) : null}
        {user}
        {isBot ? (
          <button onClick={speak} type="button">
            <SpeakerIcon src="/img/icons/speaker.svg" alt="play" />
          </button>
        ) : null}
      </Name>
      <div>
        <Text
          isBot={isBot}
          dangerouslySetInnerHTML={createMarkup(content.text)}
        />

        {content.link ? (
          <a href={content.link} target="_blank">
            [link]
          </a>
        ) : null}
      </div>
      {content.imgs && content.imgs.length ? (
        <div>
          {content.imgs.map(img => (
            <img src={img} alt={content.text} key={img} />
          ))}
        </div>
      ) : null}
    </Bubble>
  );
};

export default Message;

type AllStyledProps = ThemedStyledProps<
  React.HTMLProps<HTMLDivElement>,
  any
> & {
  isBot: boolean;
};

const Bubble = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: ${(props: AllStyledProps) =>
    props.isBot ? 'flex-start' : 'flex-end'};
  align-self: ${(props: AllStyledProps) =>
    props.isBot ? 'flex-start' : 'flex-end'};
  margin-bottom: ${props => props.theme.lengths.l4};
`;

const Name = styled.p`
  margin-bottom: ${props => props.theme.lengths.l2};
  font-weight: bold;
  font-size: ${props => props.theme.lengths.l4};
`;

const Text = styled.span`
  color: ${(props: AllStyledProps) =>
    props.isBot ? props.theme.colors.teal : props.theme.colors.blue};
`;

const SpeakerIcon = styled.img`
  width: ${props => props.theme.lengths.l4};
`;
